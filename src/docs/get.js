export default async function(docId) {
  try {
    const { data } = await this.docsAPI.documents.get({
      auth: this.client,
      documentId: docId,
    });
    return data;
  } catch (e) {
    throw e;
  }
}
