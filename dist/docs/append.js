"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function (docId, text) {
  const auth = await this.client.authorize();
  const body = JSON.stringify({
    'requests': [{
      'insertText': {
        'text': text,
        'endOfSegmentLocation': {}
      }
    }]
  });
  const request = (0, _assign2.default)({}, POST, {
    body
  });
  return (0, _nodeFetch2.default)(`https://docs.googleapis.com/v1/documents/${docId}:batchUpdate?access_token=${auth.access_token}`, request);
};

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const headers = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
};
const POST = (0, _assign2.default)({}, headers, {
  method: 'POST'
});