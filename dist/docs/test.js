"use strict";

var _expect = require("expect.js");

var _expect2 = _interopRequireDefault(_expect);

var _index = require("../index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TEST_DOCS = {
  write: '1vU03WweELqduP-MCTy6wD44ztOibHQt7dm3KPCOCaEo'
};
describe('docs', function () {
  let goot;
  before(async function () {
    goot = new _index2.default();
    await goot.auth.jwt();
  });
  it('Appends to a doc', async function () {
    const now = new Date().toISOString();
    await goot.docs.append(TEST_DOCS.write, `\n${now}`);
    const text = await goot.drive.export(TEST_DOCS.write);
    (0, _expect2.default)(text.endsWith(now)).to.be(true);
  });
});