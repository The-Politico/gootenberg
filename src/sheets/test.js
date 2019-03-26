import expect from 'expect.js';

import Gootenberg from '../index.js';

const TEST_DOCS = {
  sheets: '1ncKlvgYaKi7u4s9CRiB_xJU9qO-cTjr_yPATT05W8pE',
};

describe('sheets', function() {
  let goot;

  before(async function() {
    goot = new Gootenberg();
    await goot.auth.jwt();
  });

  it('Gets spreadsheets data', async function() {
    const data = await goot.sheets.getAll(TEST_DOCS.sheets);

    expect(data).to.be.an('object');
    expect(data).to.have.property('valueRanges');

    expect(data.valueRanges[0].values).to.be.an('array');
    expect(data.valueRanges[0].values).to.have.length(5);

    expect(data.valueRanges[0].values[0][0]).to.be('Member');
    expect(data.valueRanges[0].values[1][1]).to.be('OK');
  });
});
