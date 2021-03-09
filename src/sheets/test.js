import expect from 'expect.js';
import find from 'lodash/find';
import delay from 'delay';

import Gootenberg from '../index.js';

const TEST_DOCS = {
  sheets: '1ncKlvgYaKi7u4s9CRiB_xJU9qO-cTjr_yPATT05W8pE',
  forbidden: '1VbreUEtZ8DAD_6LCWSXqkWw-OPGfdalQamHH6zVINJ4',
  appendRow: '1HDTu6MjRZdQbNlAbJNkVau2SsnKDVXWDP17Ace3-I4U',
  createDir: '1xefL9yLhJOR7p5BwKunzgDcdFK1Ah5oz',
};

describe('sheets', () => {
  let goot;

  before(async () => {
    goot = new Gootenberg();
    await goot.auth.jwt();
  });

  it('Gets spreadsheets data', async () => {
    const data = await goot.sheets.getAll(TEST_DOCS.sheets);

    expect(data).to.be.an('object');
    expect(data).to.have.property('valueRanges');

    expect(data.valueRanges[0].values).to.be.an('array');
    expect(data.valueRanges[0].values).to.have.length(5);

    expect(data.valueRanges[0].values[0][0]).to.be('Member');
    expect(data.valueRanges[0].values[1][1]).to.be('OK');
  });

  it('Appends rows', async () => {
    const now = new Date();
    const data = [
      [
        now.getTime(),
        now.getDate(),
        now.getMonth() + 1,
        now.getFullYear(),
      ],
    ];

    await goot.sheets.appendRows(TEST_DOCS.appendRow, data);

    const confirmData = await goot.parse.table(TEST_DOCS.appendRow);
    const lastRow = confirmData.test[confirmData.test.length - 1];
    expect(lastRow.time).to.be(`${data[0][0]}`);
  });

  it('Creates a new spreadsheet', async () => {
    const now = new Date().toISOString();

    await goot.sheets.create(now, TEST_DOCS.createDir);

    // Delay because of Google caching lag
    await delay(1000);

    const filesInCopyDir = await goot.drive.ls(TEST_DOCS.createDir);
    expect(filesInCopyDir).to.be.an('array');
    expect(!!find(filesInCopyDir, { name: now })).to.be(true);
  });

  it('Handles errors gracefully', async () => {
    try {
      await goot.sheets.getAll('A-BAD-DOC-ID');
    } catch (e) {
      expect(e.message).to.be('Requested entity was not found.');
    }

    // These tests will falsly pass if the test account has access to the doc
    try {
      await goot.sheets.getAll(TEST_DOCS.forbidden);
    } catch (e) {
      expect(e.message).to.be('The caller does not have permission');
    }

    try {
      await goot.sheets.getAll([1, 2, 3]);
    } catch (e) {
      expect(e.message).to.be('Argument #1: Expected string but got array');
    }
  });
});
