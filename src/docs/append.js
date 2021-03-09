import validateArgs from 'aproba';

export default async function append(documentId, text) {
  validateArgs('SS', [documentId, text]);

  const { data } = await this.docsAPI.documents.batchUpdate({
    auth: this.client,
    documentId,
    requestBody: {
      requests: [
        {
          insertText: {
            text,
            endOfSegmentLocation: {
            },
          },
        },
      ],
    },
  });

  return data;
}
