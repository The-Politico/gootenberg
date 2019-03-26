#!/usr/bin/env node
"use strict";

var _yargs = require("yargs");

var _yargs2 = _interopRequireDefault(_yargs);

var _token = require("./cmds/token.js");

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_yargs2.default // eslint-disable-line
.help().scriptName('gootenberg') // New
.command('token [credentials] [output]', 'Generates a new OAuth token file', yargs => {
  yargs.positional('credentials', {
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
}, async function ({
  credentials,
  output
}) {
  await (0, _token2.default)(credentials, output);
}).argv;