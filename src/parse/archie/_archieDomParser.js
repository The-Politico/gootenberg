import htmlEntities from 'html-entities';
import url from 'url';
import archieml from 'archieml';

const Entities = htmlEntities.AllHtmlEntities;

export default dom => {
  const tagHandlers = {
    base(tag) {
      let str = '';
      tag.children.forEach((child) => {
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
      if (href === undefined) return '';

      // extract real URLs from Google's tracking
      // from: http://www.google.com/url?q=http%3A%2F%2Fwww.nytimes.com...
      // to: http://www.nytimes.com...
      if (
        aTag.attribs.href && url.parse(aTag.attribs.href, true).query &&
        url.parse(aTag.attribs.href, true).query.q
      ) {
        href = url.parse(aTag.attribs.href, true).query.q;
      }

      let str = `<a href="${href}">`;
      str += tagHandlers.base(aTag);
      str += '</a>';
      return str;
    },
    li(tag) {
      return `* ${tagHandlers.base(tag)}\n`;
    },
  };

  ['ul', 'ol'].forEach((tag) => {
    tagHandlers[tag] = tagHandlers.span;
  });
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach((tag) => {
    tagHandlers[tag] = tagHandlers.p;
  });

  try {
    const body = dom[0].children[1];
    let parsedText = tagHandlers.base(body);

    // Convert html entities into the characters as they exist in the google doc
    const entities = new Entities();
    parsedText = entities.decode(parsedText);

    // Remove smart quotes from inside tags
    parsedText = parsedText.replace(/<[^<>]*>/g, match =>
      match.replace(/”|“/g, '"').replace(/‘|’/g, "'"));

    const archieData = archieml.load(parsedText);
    return archieData;
  } catch (e) {
    console.error('Error parsing Google Doc.', e);
  }
  return null;
};
