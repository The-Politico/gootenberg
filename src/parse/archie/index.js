import validateArgs from 'aproba';
import archieml from 'archieml';
import docsToArchie from './_docsToArchie';

export default async function parseArchie(
  docId,
  { suggestionsViewMode } = {},
) {
  validateArgs('S', [docId]);

  const archie = await this.docs.get(docId, {
    suggestionsViewMode,
  });
  const parsed = docsToArchie(archie);
  return archieml.load(parsed);
}
