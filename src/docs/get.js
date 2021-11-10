export default async function get(docId) {
  const { data } = await this.docsAPI.documents.get({
    auth: this.client,
    documentId: docId,
    suggestionsViewMode: 'PREVIEW_SUGGESTIONS_ACCEPTED'
  });

  return data;
}
