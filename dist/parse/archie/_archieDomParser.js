"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _htmlEntities = require("html-entities");

var _htmlEntities2 = _interopRequireDefault(_htmlEntities);

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

var _archieml = require("archieml");

var _archieml2 = _interopRequireDefault(_archieml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Entities = _htmlEntities2.default.AllHtmlEntities;

exports.default = dom => {
  const tagHandlers = {
    base(tag) {
      let str = '';
      tag.children.forEach(child => {
        const func = tagHandlers[child.name || child.type] || false;
        if (func) str += func(child);
      });
      return str;
    },

    text(textTag) {
      return textTag.data;
    },

    span(spanTag) {
      return tagHandlers.base(spanTag);
    },

    p(pTag) {
      return `${tagHandlers.base(pTag)}\n`;
    },

    a(aTag) {
      let href = aTag.attribs.href;
      if (href === undefined) return ''; // extract real URLs from Google's tracking
      // from: http://www.google.com/url?q=http%3A%2F%2Fwww.nytimes.com...
      // to: http://www.nytimes.com...

      if (aTag.attribs.href && _url2.default.parse(aTag.attribs.href, true).query && _url2.default.parse(aTag.attribs.href, true).query.q) {
        href = _url2.default.parse(aTag.attribs.href, true).query.q;
      }

      let str = `<a href="${href}">`;
      str += tagHandlers.base(aTag);
      str += '</a>';
      return str;
    },

    li(tag) {
      return `* ${tagHandlers.base(tag)}\n`;
    }

  };
  ['ul', 'ol'].forEach(tag => {
    tagHandlers[tag] = tagHandlers.span;
  });
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
    tagHandlers[tag] = tagHandlers.p;
  });

  try {
    const body = dom[0].children[1];
    let parsedText = tagHandlers.base(body); // Convert html entities into the characters as they exist in the google doc

    const entities = new Entities();
    parsedText = entities.decode(parsedText); // Remove smart quotes from inside tags

    parsedText = parsedText.replace(/<[^<>]*>/g, match => match.replace(/”|“/g, '"').replace(/‘|’/g, "'"));

    const archieData = _archieml2.default.load(parsedText);

    return archieData;
  } catch (e) {
    console.error('Error parsing Google Doc.', e);
  }

  return null;
};