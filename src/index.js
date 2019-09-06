import { google } from 'googleapis';
import mapValues from 'lodash/mapValues';

import * as authMethods from './auth';
import * as driveMethods from './drive';
import * as sheetsMethods from './sheets';
import * as docsMethods from './docs';
import * as parseMethods from './parse';

class Gootenberg {
  constructor() {
    this.sheetsAPI = google.sheets('v4');
    this.driveAPI = google.drive('v3');
    this.docsAPI = google.docs('v1');
  }

  auth = mapValues(authMethods, m => m.bind(this));
  parse = mapValues(parseMethods, m => m.bind(this));
  drive = mapValues(driveMethods, m => m.bind(this));
  sheets = mapValues(sheetsMethods, m => m.bind(this));
  docs = mapValues(docsMethods, m => m.bind(this));
}

module.exports = Gootenberg;
