"use strict";

var _expect = require("expect.js");

var _expect2 = _interopRequireDefault(_expect);

var _index = require("../index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TEST_DOCS = {
  sheets: '1ncKlvgYaKi7u4s9CRiB_xJU9qO-cTjr_yPATT05W8pE'
};
describe('sheets', function () {
  let goot;
  before(async function () {
    goot = new _index2.default();
    await goot.auth.jwt();
  });
  it('Gets spreadsheets data', async function () {
    const data = await goot.sheets.getAll(TEST_DOCS.sheets);
    (0, _expect2.default)(data).to.be.an('object');
    (0, _expect2.default)(data).to.have.property('valueRanges');
    (0, _expect2.default)(data.valueRanges[0].values).to.be.an('array');
    (0, _expect2.default)(data.valueRanges[0].values).to.have.length(5);
    (0, _expect2.default)(data.valueRanges[0].values[0][0]).to.be('Member');
    (0, _expect2.default)(data.valueRanges[0].values[1][1]).to.be('OK');
  });
});