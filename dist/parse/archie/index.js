"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function (docId) {
  const archie = await this.drive.export(docId, 'text/html');
  return new Promise((resolve, reject) => {
    const handler = new _htmlparser2.default.DomHandler((error, dom) => {
      if (error) {
        console.error('Error parsing Google Doc:', error);
        return;
      }

      resolve((0, _archieDomParser2.default)(dom));
    });
    const parser = new _htmlparser2.default.Parser(handler);
    parser.write(archie);
    parser.done();
  });
};

var _htmlparser = require("htmlparser2");

var _htmlparser2 = _interopRequireDefault(_htmlparser);

var _archieDomParser = require("./_archieDomParser");

var _archieDomParser2 = _interopRequireDefault(_archieDomParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;