import expect from 'expect.js';
import find from 'lodash/find';

import Gootenberg from '../index.js';

const TEST_DOCS = {
  dir: '17BXq0RyRsCx3SYnK5SP3udytA62AQd_3',
  comments: '1P2LCY_qjK1BTsQswGLfXflbZkevbxzpGfwZRCa7Ijio',
  plain: '1PuNgReMyfoUr1woeaNcmAVW3z8yUrGQSNCWTKRkkuSo',
  rename: '1U8ycLDY28JxftsScSui-OF8r_r0P3n_RQwtv2huW0Es',
  move: '15DOXdXkE7_tSFv7lUuYU3iZj8SCcDmrxg8lrl5cE-XA',
  moveDirA: '1Jg7ouv1hmmc0gmIOcINPdimAYojvS731',
  moveDirB: '1DanxRi25YWwMJF4vk9Qu7OrDrUJ1X3vM',
  copyBase: '1zszi9Pof26v7TWQLLvVtvrqAfPwcwBFaZAPzapKrBPc',
  copyDir: '1-qOZ0r4aELn5vdu2tVWR4icL3WSBXwOp',
  copyToDir: '107ZbnAKvuQbdvAYdZHNSFo-rZYdKg7ud',
};

describe('drive', () => {
  let goot;

  before(async () => {
    goot = new Gootenberg();
    await goot.auth.jwt();
  });

  it('Gets comments', async () => {
    const comments = await goot.drive.comments(TEST_DOCS.comments);

    expect(comments).to.be.an('array');
    expect(comments).to.have.length(1);

    expect(comments[0]).to.have.property('content');
    expect(comments[0].content).to.be('Lorem ipsum.');
  });

  it('Downloads plain text', async () => {
    const text = await goot.drive.export(TEST_DOCS.plain);

    const lorem = (
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do'
      + ' eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim'
      + ' ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut'
      + ' aliquip ex ea commodo consequat. Duis aute irure dolor in'
      + ' reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla'
      + ' pariatur. Excepteur sint occaecat cupidatat non proident, sunt in'
      + ' culpa qui officia deserunt mollit anim id est laborum.'
    );

    expect(text.trim()).to.be(lorem);
  });

  it('Searches for files', async () => {
    const docs = await goot.drive.files('name = "plain"');

    expect(docs).to.be.an('array');
    expect(docs).to.have.length(1);

    expect(docs[0]).to.have.property('id');
    expect(docs[0].id).to.be(TEST_DOCS.plain);
  });

  it('Gets files in a directory', async () => {
    const files = await goot.drive.ls(TEST_DOCS.dir);

    expect(files).to.be.an('array');

    expect(!!find(files, { name: 'append' })).to.be(true);
    expect(!!find(files, { name: 'sheets' })).to.be(true);
    expect(!!find(files, { name: 'plain' })).to.be(true);
    expect(!!find(files, { name: 'comments' })).to.be(true);
    expect(!!find(files, { name: 'archie' })).to.be(true);
  });

  it('Gets the last modified time', async () => {
    const lastModified = await goot.drive.getLastModified(TEST_DOCS.plain);
    expect(lastModified instanceof Date).to.be(true);
    expect(lastModified < new Date()).to.be(true);
  });

  it('Renames files', async () => {
    const now = new Date().toISOString();
    const newTile = `rename – ${now}`;

    await goot.drive.rename(TEST_DOCS.rename, newTile);

    const files = await goot.drive.ls(TEST_DOCS.dir);
    expect(files).to.be.an('array');
    expect(!!find(files, { name: newTile })).to.be(true);

    await goot.drive.rename(TEST_DOCS.rename, 'rename');
  });

  it('Moves files', async () => {
    await goot.drive.move(TEST_DOCS.move, TEST_DOCS.moveDirB);

    const filesInB = await goot.drive.ls(TEST_DOCS.moveDirB);
    expect(filesInB).to.be.an('array');
    expect(!!find(filesInB, { name: 'move' })).to.be(true);

    await goot.drive.move(TEST_DOCS.move, TEST_DOCS.moveDirA);
  });

  it('Copies files', async () => {
    const now = new Date().toISOString();

    const copyFile = await goot.drive.copy(TEST_DOCS.copyBase, {
      title: now,
    });

    const filesInCopy = await goot.drive.ls(TEST_DOCS.copyDir);
    expect(filesInCopy).to.be.an('array');
    expect(!!find(filesInCopy, { name: now })).to.be(true);

    const baseContents = await goot.drive.export(TEST_DOCS.copyBase);
    const copyContents = await goot.drive.export(copyFile.id);
    expect(copyContents).to.be(baseContents);
  });

  it('Copies files into a different directory', async () => {
    const now = new Date().toISOString();

    const copyMoveFile = await goot.drive.copy(TEST_DOCS.copyBase, {
      title: now,
      destination: TEST_DOCS.copyToDir,
    });

    const filesInCopy = await goot.drive.ls(TEST_DOCS.copyToDir);
    expect(filesInCopy).to.be.an('array');
    expect(!!find(filesInCopy, { name: now })).to.be(true);

    const baseContents = await goot.drive.export(TEST_DOCS.copyBase);
    const copyContents = await goot.drive.export(copyMoveFile.id);
    expect(copyContents).to.be(baseContents);
  });

  it('Handles errors gracefully', async () => {
    try {
      await goot.drive.copy(null);
    } catch (e) {
      expect(e.message).to.be('Argument #1: Expected string but got null');
    }

    expect(true).to.be(true);
  });
});
