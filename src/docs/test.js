import expect from 'expect.js';

import Gootenberg from '../index.js';

const TEST_DOCS = {
  write: '1vU03WweELqduP-MCTy6wD44ztOibHQt7dm3KPCOCaEo',
};

describe('docs', function() {
  let goot;

  before(async function() {
    goot = new Gootenberg();
    await goot.auth.jwt();
  });

  it('Appends to a doc', async function() {
    const now = new Date().toISOString();
    await goot.docs.append(TEST_DOCS.write, `\n${now}`);

    const text = await goot.drive.export(TEST_DOCS.write);

    expect(text.endsWith(now)).to.be(true);
  });

  it('Handles errors gracefully', async function() {
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

    expect(true).to.be(true);
  });
});
