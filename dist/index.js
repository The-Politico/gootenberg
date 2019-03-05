"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _googleapis = require("googleapis");

var _mapValues = require("lodash/mapValues");

var _mapValues2 = _interopRequireDefault(_mapValues);

var _common = require("./common");

var commonMethods = _interopRequireWildcard(_common);

var _drive = require("./drive");

var driveMethods = _interopRequireWildcard(_drive);

var _sheets = require("./sheets");

var sheetsMethods = _interopRequireWildcard(_sheets);

var _docs = require("./docs");

var docsMethods = _interopRequireWildcard(_docs);

var _parse = require("./parse");

var parseMethods = _interopRequireWildcard(_parse);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Gootenberg {
  constructor(credentials) {
    _defineProperty(this, "auth", commonMethods.auth.bind(this));

    _defineProperty(this, "parse", (0, _mapValues2.default)(parseMethods, m => m.bind(this)));

    _defineProperty(this, "drive", (0, _mapValues2.default)(driveMethods, m => m.bind(this)));

    _defineProperty(this, "sheets", (0, _mapValues2.default)(sheetsMethods, m => m.bind(this)));

    _defineProperty(this, "docs", (0, _mapValues2.default)(docsMethods, m => m.bind(this)));

    this.credentials = credentials;
    this.sheetsAPI = _googleapis.google.sheets('v4');
    this.driveAPI = _googleapis.google.drive('v3');
  }

}

exports.default = Gootenberg;