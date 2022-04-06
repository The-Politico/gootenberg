export default async function get(
  docId,
  { suggestionsViewMode = 'PREVIEW_WITHOUT_SUGGESTIONS' } = {},
) {
  const { data } = await this.docsAPI.documents.get({
    auth: this.client,
    documentId: docId,
    suggestionsViewMode,
  });

  return data;
}