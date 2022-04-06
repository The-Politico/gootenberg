import expect from 'expect.js';
import find from 'lodash/find';
import delay from 'delay';

import Gootenberg from '../index.js';

require('dotenv').config();

const TEST_DOCS = {
  write: '1vU03WweELqduP-MCTy6wD44ztOibHQt7dm3KPCOCaEo',
  createDir: '1OHMEn5jJoaVaNu-uIgsQwy6ZIZ9Dhvd7',
  suggestions: '1QmdLj6kTx7Z6gMoA-5pqqUE2m5n_skaVs-wL-w2YYzk',
};

describe('docs', () => {
  let goot;

  before(async () => {
    goot = new Gootenberg();
    await goot.auth.jwt();
  });

  it('Appends to a doc', async () => {
    const now = new Date().toISOString();
    await goot.docs.append(TEST_DOCS.write, `\n${now}`);

    const text = await goot.drive.export(TEST_DOCS.write);

    expect(text.endsWith(now)).to.be(true);
  });

  it('Creates a new document', async () => {
    const now = new Date().toISOString();

    await goot.docs.create(now, TEST_DOCS.createDir);

    // Delay because of Google caching lag
    await delay(1000);

    const filesInCopyDir = await goot.drive.ls(TEST_DOCS.createDir);
    expect(filesInCopyDir).to.be.an('array');
    expect(!!find(filesInCopyDir, { name: now })).to.be(true);
  });

  it('Handles errors gracefully', async () => {
    try {
      await goot.docs.get('A-BAD-DOC-ID');
    } catch (e) {
      expect(e.message).to.be('Requested entity was not found.');
    }

    try {
      await goot.docs.get('1rDLOXrnPbSXZaYPFcdjp5i2glNDQ5AlzsDJNaRr6Myc');
    } catch (e) {
      expect(e.message).to.be('The caller does not have permission');
    }

    try {
      await goot.docs.append();
    } catch (e) {
      expect(e.message).to.be('Argument #1: Expected string but got null');
    }

    try {
      await goot.docs.append({});
    } catch (e) {
      expect(e.message).to.be('Argument #1: Expected string but got object');
    }

    expect(true).to.be(true);
  });

  it('Handles suggestions based on argument', async () => {
    const textWithoutSuggestions = await goot.docs.get(TEST_DOCS.suggestions);
    expect(
      textWithoutSuggestions.body.content[1]
        .paragraph.elements[1].textRun.content.trim(),
    ).to.be('World');

    const textWithSuggestionsAccepted = await goot.docs.get(
      TEST_DOCS.suggestions,
      { suggestionsViewMode: 'PREVIEW_SUGGESTIONS_ACCEPTED' },
    );
    expect(
      textWithSuggestionsAccepted.body.content[1]
        .paragraph.elements[1].textRun.content.trim(),
    ).to.be('Foo');

    const textWithSuggestionsInline = await goot.docs.get(
      TEST_DOCS.suggestions,
      { suggestionsViewMode: 'SUGGESTIONS_INLINE' },
    );

    expect(
      textWithSuggestionsInline.body.content[1]
        .paragraph.elements[2].textRun.content.trim(),
    ).to.be('Foo');

    expect(
      textWithSuggestionsInline.body.content[1]
        .paragraph.elements[3].textRun.content.trim(),
    ).to.be('World');
  });
});
