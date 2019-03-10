import expect from 'expect.js';

import Gootenberg from '../index.js';

const TEST_DOCS = {
  archie: '1aQjMYGik1UaqyyM-Ruyx9QwILwBzmkYyVOqCHR6641U',
  sheets: '1ncKlvgYaKi7u4s9CRiB_xJU9qO-cTjr_yPATT05W8pE',
};

describe('parse', function() {
  let goot;

  before(async function() {
    goot = new Gootenberg();
    await goot.auth();
  });

  it('Parses archieml data', async function() {
    const data = await goot.parse.archie(TEST_DOCS.archie);

    expect(data).to.be.an('object');
    expect(data['Key']).to.be('Value');
    expect(data['Key2']).to.be('Value2');

    expect(data.arr).to.be.an('array');
    expect(data.arr).to.have.length(3);
    expect(data.arr[0]['Key']).to.be('value');
  });

  it('Parses sheet table data', async function() {
    const data = await goot.parse.table(TEST_DOCS.sheets);

    expect(data).to.be.an('object');
    expect(data).to.have.property('Status');
    expect(data.Status[0]).to.have.property('Member');
    expect(data.Status[0].Member).to.be('McClure');
  });
});
