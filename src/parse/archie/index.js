import archieml from 'archieml';
import docsToArchie from './_docsToArchie';

export default async function parseArchie(docId) {
  const archie = await this.docs.get(docId);
  const parsed = docsToArchie(archie);
  return archieml.load(parsed);
}
