"use strict";

var _expect = require("expect.js");

var _expect2 = _interopRequireDefault(_expect);

var _index = require("../index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TEST_DOCS = {
  archie: '1aQjMYGik1UaqyyM-Ruyx9QwILwBzmkYyVOqCHR6641U',
  sheets: '1ncKlvgYaKi7u4s9CRiB_xJU9qO-cTjr_yPATT05W8pE'
};
describe('parse', function () {
  let goot;
  before(async function () {
    goot = new _index2.default();
    await goot.auth.jwt();
  });
  it('Parses archieml data', async function () {
    const data = await goot.parse.archie(TEST_DOCS.archie);
    (0, _expect2.default)(data).to.be.an('object');
    (0, _expect2.default)(data['Key']).to.be('Value');
    (0, _expect2.default)(data['Key2']).to.be('Value2');
    (0, _expect2.default)(data.arr).to.be.an('array');
    (0, _expect2.default)(data.arr).to.have.length(3);
    (0, _expect2.default)(data.arr[0]['Key']).to.be('value');
  });
  it('Parses sheet table data', async function () {
    const data = await goot.parse.table(TEST_DOCS.sheets);
    (0, _expect2.default)(data).to.be.an('object');
    (0, _expect2.default)(data).to.have.property('Status');
    (0, _expect2.default)(data.Status[0]).to.have.property('Member');
    (0, _expect2.default)(data.Status[0].Member).to.be('McClure');
  });
});