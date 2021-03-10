#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var yargs = _interopDefault(require('yargs'));
var googleAuthLibrary = require('google-auth-library');
var fsExtra = require('fs-extra');
var inquirer = _interopDefault(require('inquirer'));

var code = (function () {
  return inquirer.prompt([{
    type: 'input',
    name: 'answer',
    message: 'Enter the code from that page here: '
  }]).then(function (_ref) {
    var answer = _ref.answer;
    return answer;
  });
});

var SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

function getToken(client, code) {
  return new Promise(function (resolve, reject) {
    client.getToken(code, function (err, token) {
      if (err) {
        reject(err);
      }

      resolve(token);
    });
  });
}

function createOAuthToken() {
  return _createOAuthToken.apply(this, arguments);
}

function _createOAuthToken() {
  _createOAuthToken = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    var credentialsOrPath,
        tokenPath,
        credentials,
        _credentials$installe,
        clientSecret,
        clientId,
        redirectUris,
        client,
        authUrl,
        code$1,
        token,
        _args = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            credentialsOrPath = _args.length > 0 && _args[0] !== undefined ? _args[0] : 'credentials.json';
            tokenPath = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'token.json';
            credentials = credentialsOrPath;

            if (!(typeof credentialsPath === 'string')) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return fsExtra.readJSON(credentials);

          case 6:
            credentials = _context.sent;
            _context.next = 11;
            break;

          case 9:
            if (!(credentialsOrPath === undefined)) {
              _context.next = 11;
              break;
            }

            throw new Error('Must supply a credentials object, or path to a credentials file.');

          case 11:
            _credentials$installe = credentials.installed, clientSecret = _credentials$installe.client_secret, clientId = _credentials$installe.client_id, redirectUris = _credentials$installe.redirect_uris;
            client = new googleAuthLibrary.OAuth2Client(clientId, clientSecret, redirectUris[0]);
            authUrl = client.generateAuthUrl({
              access_type: 'offline',
              scope: SCOPES
            });
            console.log('Authorize this app by visiting this url:', authUrl);
            _context.next = 17;
            return code();

          case 17:
            code$1 = _context.sent;
            _context.next = 20;
            return getToken(client, code$1);

          case 20:
            token = _context.sent;
            client.setCredentials(token);
            _context.next = 24;
            return fsExtra.writeFile(tokenPath, JSON.stringify(token), function (err) {
              if (err) return console.error(err);
              console.log('Token stored to', tokenPath);
            });

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createOAuthToken.apply(this, arguments);
}

yargs // eslint-disable-line
.help().scriptName('gootenberg') // New
.command('token [credentials] [output]', 'Generates a new OAuth token file', function (args) {
  args.positional('credentials', {
    alias: 'c',
    describe: 'The path to your credentials file',
    type: 'string',
    default: 'credentials.json'
  }).positional('output', {
    alias: 'o',
    describe: 'The path to the output of your token file',
    type: 'string',
    default: 'token.json'
  });
},
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(_ref) {
    var credentials, output;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            credentials = _ref.credentials, output = _ref.output;
            _context.next = 3;
            return createOAuthToken(credentials, output);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}()).argv;
