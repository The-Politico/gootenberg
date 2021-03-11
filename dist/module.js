import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { google } from 'googleapis';
import mapValues from 'lodash/mapValues';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _typeof from '@babel/runtime/helpers/typeof';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import { readJSON } from 'fs-extra';
import { JWT, OAuth2Client } from 'google-auth-library';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import validateArgs from 'aproba';
import archieml from 'archieml';

function jwt(_x) {
  return _jwt.apply(this, arguments);
}

function _jwt() {
  _jwt = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(config) {
    var credentials;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(typeof config === 'string')) {
              _context.next = 6;
              break;
            }

            _context.next = 3;
            return readJSON(config);

          case 3:
            credentials = _context.sent;
            _context.next = 7;
            break;

          case 6:
            if (_typeof(config) === 'object') {
              credentials = config;
            } else if (config === undefined) {
              credentials = {
                client_email: process.env.GAPI_CLIENT_EMAIL,
                private_key: process.env.GAPI_PRIVATE_KEY.replace(/\\n/g, '\n')
              };
            }

          case 7:
            this.client = new JWT({
              email: credentials.client_email,
              key: credentials.private_key,
              scopes: ['https://www.googleapis.com/auth/drive']
            });
            _context.next = 10;
            return this.client.authorize();

          case 10:
            return _context.abrupt("return", this);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _jwt.apply(this, arguments);
}

function oauth(_x, _x2) {
  return _oauth.apply(this, arguments);
}

function _oauth() {
  _oauth = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(config, token) {
    var credentials, _credentials$installe, clientSecret, clientId, redirectUris;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(typeof config === 'string')) {
              _context.next = 6;
              break;
            }

            _context.next = 3;
            return readJSON(config);

          case 3:
            credentials = _context.sent;
            _context.next = 7;
            break;

          case 6:
            if (_typeof(config) === 'object') {
              credentials = config;
            }

          case 7:
            _credentials$installe = credentials.installed, clientSecret = _credentials$installe.client_secret, clientId = _credentials$installe.client_id, redirectUris = _credentials$installe.redirect_uris;
            this.client = new OAuth2Client(clientId, clientSecret, redirectUris[0]);
            _context.next = 11;
            return this.client.setCredentials(token);

          case 11:
            return _context.abrupt("return", this);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _oauth.apply(this, arguments);
}



var authMethods = /*#__PURE__*/Object.freeze({
  jwt: jwt,
  oauth: oauth
});

function comments(id) {
  var _this = this;

  validateArgs('S', [id]);
  return new Promise(function (resolve, reject) {
    var getComments = function getComments(fileId) {
      var pageToken = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var accumulator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      _this.driveAPI.comments.list({
        auth: _this.client,
        fileId: fileId,
        pageToken: pageToken,
        fields: 'comments,nextPageToken',
        pageSize: 100
      }, function (err, resp) {
        if (err) {
          reject(err);
        }

        var commentData = [].concat(_toConsumableArray(accumulator), _toConsumableArray(resp.data.comments));

        if (resp.data.nextPageToken) {
          getComments(fileId, resp.data.nextPageToken, commentData);
        } else {
          resolve(commentData);
        }
      });
    };

    getComments(id);
  });
}

function copy(_x) {
  return _copy.apply(this, arguments);
}

function _copy() {
  _copy = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(src) {
    var _ref,
        destination,
        title,
        requestBody,
        _ref2,
        data,
        copyId,
        _args = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref = _args.length > 1 && _args[1] !== undefined ? _args[1] : {}, destination = _ref.destination, title = _ref.title;
            validateArgs('S', [src]);
            requestBody = destination ? {
              parents: [destination]
            } : {};
            _context.next = 5;
            return this.driveAPI.files.copy({
              auth: this.client,
              fileId: src,
              requestBody: requestBody
            });

          case 5:
            _ref2 = _context.sent;
            data = _ref2.data;

            if (!title) {
              _context.next = 11;
              break;
            }

            copyId = data.id;
            _context.next = 11;
            return this.drive.rename(copyId, title);

          case 11:
            return _context.abrupt("return", data);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _copy.apply(this, arguments);
}

function driveExport(fileId) {
  var _this = this;

  var mimeType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'text/plain';
  validateArgs('SS', [fileId, mimeType]);
  return new Promise(function (resolve, reject) {
    _this.driveAPI.files.export({
      auth: _this.client,
      fileId: fileId,
      mimeType: mimeType
    }, function (err, resp) {
      if (err) {
        reject(err);
      }

      resolve(resp.data);
    });
  });
}

function driveFiles(query) {
  var _this = this;

  validateArgs('S', [query]);
  return new Promise(function (resolve, reject) {
    _this.driveAPI.files.list({
      auth: _this.client,
      q: query,
      spaces: 'drive'
    }, function (err, resp) {
      if (err) {
        reject(err);
      }

      resolve(resp.data.files);
    });
  });
}

function getLastModified(_x) {
  return _getLastModified.apply(this, arguments);
}

function _getLastModified() {
  _getLastModified = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2(fileId) {
    var self, listRevisions, pageToken, result, lastModifiedTimeStr;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            validateArgs('S', [fileId]);
            self = this; // Set up function for recursion

            listRevisions =
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              _regeneratorRuntime.mark(function _callee(fid, pageToken) {
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        return _context.abrupt("return", new Promise(function (resolve, reject) {
                          self.driveAPI.revisions.list({
                            auth: self.client,
                            pageSize: 200,
                            fileId: fid,
                            pageToken: pageToken
                          }, function (err, resp) {
                            if (err) {
                              reject(err);
                            }

                            resolve(resp.data);
                          });
                        }));

                      case 1:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function listRevisions(_x2, _x3) {
                return _ref.apply(this, arguments);
              };
            }(); // Set up data holders


            _context2.next = 5;
            return listRevisions(fileId, pageToken);

          case 5:
            result = _context2.sent;
            pageToken = result.nextPageToken; // Handle recursion of paginated

          case 7:
            if (!(pageToken !== undefined)) {
              _context2.next = 14;
              break;
            }

            _context2.next = 10;
            return listRevisions(fileId, pageToken);

          case 10:
            result = _context2.sent;
            pageToken = result.nextPageToken;
            _context2.next = 7;
            break;

          case 14:
            // Sort, filter, return  the latest modifiedTime
            lastModifiedTimeStr = result.revisions.sort(function (a, b) {
              return new Date(b.modifiedTime) - new Date(a.modifiedTime);
            })[0].modifiedTime;
            return _context2.abrupt("return", new Date(lastModifiedTimeStr));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _getLastModified.apply(this, arguments);
}

function ls(dirId) {
  var _this = this;

  validateArgs('S', [dirId]);
  return new Promise(function (resolve, reject) {
    var getChildren = function getChildren(fileId) {
      var pageToken = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var accumulator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      _this.driveAPI.files.list({
        auth: _this.client,
        q: "'".concat(fileId, "' in parents"),
        pageToken: pageToken,
        pageSize: 100
      }, function (err, resp) {
        if (err) {
          reject(err);
        }

        var commentData = [].concat(_toConsumableArray(accumulator), _toConsumableArray(resp.data.files));

        if (resp.data.nextPageToken) {
          getChildren(fileId, resp.data.nextPageToken, commentData);
        } else {
          resolve(commentData);
        }
      });
    };

    getChildren(dirId);
  });
}

function move(_x, _x2) {
  return _move.apply(this, arguments);
}

function _move() {
  _move = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(srcId, destinationId) {
    var src, previousParents;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            validateArgs('SS', [srcId, destinationId]);
            _context.next = 3;
            return this.driveAPI.files.get({
              auth: this.client,
              fileId: srcId,
              fields: 'parents'
            });

          case 3:
            src = _context.sent;
            previousParents = src.data.parents.join(',');
            _context.next = 7;
            return this.driveAPI.files.update({
              auth: this.client,
              fileId: srcId,
              addParents: destinationId,
              removeParents: previousParents,
              fields: 'id, parents'
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _move.apply(this, arguments);
}

function rename(_x, _x2) {
  return _rename.apply(this, arguments);
}

function _rename() {
  _rename = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(fileId, newTitle) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            validateArgs('SS', [fileId, newTitle]);
            return _context.abrupt("return", this.driveAPI.files.update({
              auth: this.client,
              fileId: fileId,
              requestBody: {
                name: newTitle
              }
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _rename.apply(this, arguments);
}



var driveMethods = /*#__PURE__*/Object.freeze({
  comments: comments,
  copy: copy,
  export: driveExport,
  files: driveFiles,
  getLastModified: getLastModified,
  ls: ls,
  move: move,
  rename: rename
});

function appendRows(_x, _x2) {
  return _appendRows.apply(this, arguments);
}

function _appendRows() {
  _appendRows = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(spreadsheetId, values) {
    var _ref,
        _ref$valueInputOption,
        valueInputOption,
        _ref2,
        data,
        _args = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref = _args.length > 2 && _args[2] !== undefined ? _args[2] : {}, _ref$valueInputOption = _ref.valueInputOption, valueInputOption = _ref$valueInputOption === void 0 ? 'RAW' : _ref$valueInputOption;
            validateArgs('SA', [spreadsheetId, values]);

            if (Array.isArray(values[0])) {
              _context.next = 4;
              break;
            }

            throw new Error('Argument #2: Each item in array should be an array of values.');

          case 4:
            _context.next = 6;
            return this.sheetsAPI.spreadsheets.values.append({
              auth: this.client,
              spreadsheetId: spreadsheetId,
              range: 'A1',
              insertDataOption: 'INSERT_ROWS',
              valueInputOption: valueInputOption,
              resource: {
                majorDimension: 'ROWS',
                values: values
              }
            });

          case 6:
            _ref2 = _context.sent;
            data = _ref2.data;
            return _context.abrupt("return", data);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _appendRows.apply(this, arguments);
}

function getAll(_x) {
  return _getAll.apply(this, arguments);
}

function _getAll() {
  _getAll = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(spreadsheetId) {
    var _ref, spreadsheetData, _ref2, data;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            validateArgs('S', [spreadsheetId]);
            _context.next = 3;
            return this.sheetsAPI.spreadsheets.get({
              auth: this.client,
              spreadsheetId: spreadsheetId,
              range: []
            });

          case 3:
            _ref = _context.sent;
            spreadsheetData = _ref.data;
            _context.next = 7;
            return this.sheetsAPI.spreadsheets.values.batchGet({
              auth: this.client,
              spreadsheetId: spreadsheetId,
              ranges: spreadsheetData.sheets.map(function (s) {
                return s.properties.title;
              })
            });

          case 7:
            _ref2 = _context.sent;
            data = _ref2.data;
            return _context.abrupt("return", data);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getAll.apply(this, arguments);
}

function create(_x, _x2) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(title, directoryId) {
    var _ref, data, spreadsheetId;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            validateArgs('S|SS', [title, directoryId]);
            _context.next = 3;
            return this.sheetsAPI.spreadsheets.create({
              auth: this.client,
              resource: {
                properties: {
                  title: title
                }
              }
            });

          case 3:
            _ref = _context.sent;
            data = _ref.data;

            if (!directoryId) {
              _context.next = 9;
              break;
            }

            spreadsheetId = data.spreadsheetId;
            _context.next = 9;
            return this.drive.move(spreadsheetId, directoryId);

          case 9:
            return _context.abrupt("return", data);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _create.apply(this, arguments);
}



var sheetsMethods = /*#__PURE__*/Object.freeze({
  appendRows: appendRows,
  getAll: getAll,
  create: create
});

function append(_x, _x2) {
  return _append.apply(this, arguments);
}

function _append() {
  _append = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(documentId, text) {
    var _ref, data;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            validateArgs('SS', [documentId, text]);
            _context.next = 3;
            return this.docsAPI.documents.batchUpdate({
              auth: this.client,
              documentId: documentId,
              requestBody: {
                requests: [{
                  insertText: {
                    text: text,
                    endOfSegmentLocation: {}
                  }
                }]
              }
            });

          case 3:
            _ref = _context.sent;
            data = _ref.data;
            return _context.abrupt("return", data);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _append.apply(this, arguments);
}

function create$1(_x, _x2) {
  return _create$1.apply(this, arguments);
}

function _create$1() {
  _create$1 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(title, directoryId) {
    var _ref, data, documentId;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            validateArgs('S|SS', [title, directoryId]);
            _context.next = 3;
            return this.docsAPI.documents.create({
              auth: this.client,
              title: title
            });

          case 3:
            _ref = _context.sent;
            data = _ref.data;

            if (!directoryId) {
              _context.next = 9;
              break;
            }

            documentId = data.documentId;
            _context.next = 9;
            return this.drive.move(documentId, directoryId);

          case 9:
            return _context.abrupt("return", data);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _create$1.apply(this, arguments);
}

function get(_x) {
  return _get.apply(this, arguments);
}

function _get() {
  _get = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(docId) {
    var _ref, data;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this.docsAPI.documents.get({
              auth: this.client,
              documentId: docId
            });

          case 2:
            _ref = _context.sent;
            data = _ref.data;
            return _context.abrupt("return", data);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _get.apply(this, arguments);
}



var docsMethods = /*#__PURE__*/Object.freeze({
  append: append,
  create: create$1,
  get: get
});

var wrap = function wrap(wrapped, wrapper) {
  var startsWithBreak = wrapped[0] === '\n';
  var endsInBreak = wrapped.substring(wrapped.length - 1) === '\n';
  var pureStr = wrapped.substring(startsWithBreak ? 1 : 0, endsInBreak ? wrapped.length - 1 : wrapped.length);
  return "".concat(startsWithBreak ? '\n' : '').concat(wrapper).concat(pureStr).concat(wrapper).concat(endsInBreak ? '\n' : '');
};

var blockStyles = [{
  name: 'Links',
  condition: function condition(text, element) {
    return element.textRun.textStyle.link;
  },
  effect: function effect(text, element) {
    return "[".concat(text, "](").concat(element.textRun.textStyle.link.url, ")");
  }
}, {
  name: 'Bold Text',
  condition: function condition(text, element) {
    return element.textRun.textStyle.bold;
  },
  effect: function effect(text) {
    return wrap(text, '**');
  }
}, {
  name: 'Italic Text',
  condition: function condition(text, element) {
    return element.textRun.textStyle.italic;
  },
  effect: function effect(text) {
    return wrap(text, '*');
  }
}, {
  name: 'Underline Text',
  condition: function condition(text, element) {
    return element.textRun.textStyle.underline && !element.textRun.textStyle.link;
  },
  effect: function effect(text) {
    return wrap(text, '_');
  }
}];

var parseElement = function parseElement(e) {
  var text = e.textRun.content;
  blockStyles.forEach(function (block) {
    text = block.condition(text, e) ? block.effect(text, e) : text;
  }, e);
  return text;
};

var parseParagraph = function parseParagraph(p) {
  if (p.paragraph) {
    return p.paragraph.elements.reduce(function (accumulator, current) {
      return accumulator + parseElement(current);
    }, '');
  }

  return '';
};

var docsToArchie = (function (doc) {
  return doc.body.content.reduce(function (accumulator, current) {
    return accumulator + parseParagraph(current);
  }, '').trim();
});

function parseArchie(_x) {
  return _parseArchie.apply(this, arguments);
}

function _parseArchie() {
  _parseArchie = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(docId) {
    var archie, parsed;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            validateArgs('S', [docId]);
            _context.next = 3;
            return this.docs.get(docId);

          case 3:
            archie = _context.sent;
            parsed = docsToArchie(archie);
            return _context.abrupt("return", archieml.load(parsed));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _parseArchie.apply(this, arguments);
}

function parseTable(_x) {
  return _parseTable.apply(this, arguments);
}

function _parseTable() {
  _parseTable = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(sheetId) {
    var output, data;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            validateArgs('S', [sheetId]);
            output = {};
            _context.next = 4;
            return this.sheets.getAll(sheetId);

          case 4:
            data = _context.sent;
            // for each Sheet
            data.valueRanges.forEach(function (s) {
              var name = s.range.replace(/'/g, '').split('!')[0];
              var headers = s.values[0];
              output[name] = []; // for each row

              s.values.forEach(function (v, vidx) {
                if (vidx === 0) {
                  return;
                }

                var entry = {}; // for each column

                headers.forEach(function (h, hidx) {
                  entry[h] = s.values[vidx][hidx];
                });
                output[name].push(entry);
              });
            });
            return _context.abrupt("return", output);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _parseTable.apply(this, arguments);
}



var parseMethods = /*#__PURE__*/Object.freeze({
  archie: parseArchie,
  table: parseTable
});

var Gootenberg = function Gootenberg() {
  var _this = this;

  _classCallCheck(this, Gootenberg);

  _defineProperty(this, "auth", mapValues(authMethods, function (m) {
    return m.bind(_this);
  }));

  _defineProperty(this, "parse", mapValues(parseMethods, function (m) {
    return m.bind(_this);
  }));

  _defineProperty(this, "drive", mapValues(driveMethods, function (m) {
    return m.bind(_this);
  }));

  _defineProperty(this, "sheets", mapValues(sheetsMethods, function (m) {
    return m.bind(_this);
  }));

  _defineProperty(this, "docs", mapValues(docsMethods, function (m) {
    return m.bind(_this);
  }));

  this.sheetsAPI = google.sheets('v4');
  this.driveAPI = google.drive('v3');
  this.docsAPI = google.docs('v1');
};

module.exports = Gootenberg;
