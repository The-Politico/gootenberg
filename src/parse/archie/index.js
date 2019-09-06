import docsToArchie from './_docsToArchie';
import archieml from 'archieml';

export default async function(docId) {
  const archie = await this.docs.get(docId);
  const parsed = docsToArchie(archie);
  return archieml.load(parsed);
};
