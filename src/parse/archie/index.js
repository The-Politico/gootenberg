import htmlparser from 'htmlparser2';
import archieDomParser from './_archieDomParser';

export default async function(docId) {
  const archie = await this.drive.export(docId, 'text/html');
  return new Promise((resolve, reject) => {
    const handler = new htmlparser.DomHandler((error, dom) => {
      if (error) {
        console.error('Error parsing Google Doc:', error);
        return;
      }
      resolve(archieDomParser(dom));
    });

    const parser = new htmlparser.Parser(handler);
    parser.write(archie);
    parser.done();
  });
};
