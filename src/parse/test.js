import expect from 'expect.js';

import Gootenberg from '../index.js';

const TEST_DOCS = {
  archie: '1aQjMYGik1UaqyyM-Ruyx9QwILwBzmkYyVOqCHR6641U',
  sheets: '1ncKlvgYaKi7u4s9CRiB_xJU9qO-cTjr_yPATT05W8pE',
};

describe('parse', () => {
  let goot;

  before(async () => {
    goot = new Gootenberg();
    await goot.auth.jwt();
  });

  it('Parses archieml data', async () => {
    const data = await goot.parse.archie(TEST_DOCS.archie);

    expect(data).to.be.an('object');
    expect(data.Key).to.be('Value');
    expect(data.Key2).to.be('Value2');

    expect(data.arr).to.be.an('array');
    expect(data.arr).to.have.length(3);
    expect(data.arr[0].Key).to.be('value');

    expect(data.Content).to.be(
      'Lorem [ipsum](https://example.com) dolor **sit** amet, *consectetur* '
      + 'adipisicing ***elit***, sed do _eiusmod_ **[tempor incididunt]'
      + '(https://example.com)** ut labore et dolore magna aliqua. Ut enim ad '
      + 'minim veniam, quis nostrud exercitation ullamco laboris nisi ut '
      + 'aliquip ex ea commodo consequat. Duis aute irure dolor in '
      + 'reprehenderit in voluptate velit esse cillum dolore eu '
      + 'fugiat nulla pariatur. Excepteur sint occaecat cupidatat non '
      + 'proident, sunt in culpa qui officia deserunt mollit anim id est '
      + 'laborum.',
    );

    expect(data.List).to.be.an('array');
    expect(data.List).to.have.length(3);
    expect(data.List[0]).to.be('One');

    expect(data.Blocks).to.be(
      '\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do '
      + 'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim '
      + 'ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut '
      + 'aliquip ex ea commodo consequat. Duis aute irure dolor in '
      + 'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla '
      + 'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in '
      + 'culpa qui officia deserunt mollit anim id est laborum.\n\n**Lorem '
      + 'ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod '
      + 'tempor incididunt ut labore et dolore magna aliqua. **\n\nExcepteur '
      + 'sint occaecat cupidatat non proident, sunt in culpa qui officia '
      + 'deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis '
      + 'nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo '
      + 'consequat.\n\n[Read More: A Headline Here](https://example.com)'
      + '\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse '
      + 'cillum dolore eu fugiat nulla pariatur.',
    );
  });

  it('Parses sheet table data', async () => {
    const data = await goot.parse.table(TEST_DOCS.sheets);

    expect(data).to.be.an('object');
    expect(data).to.have.property('Status');
    expect(data.Status[0]).to.have.property('Member');
    expect(data.Status[0].Member).to.be('McClure');

    expect(data).to.have.property('WeIrD N8me');
  });
});
