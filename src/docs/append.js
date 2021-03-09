import fetch from 'node-fetch';
import assign from 'lodash/assign';

const headers = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
};

const POST = assign({}, headers, { method: 'POST' });

export default async function append(docId, text) {
  const auth = await this.client.authorize();
  const body = JSON.stringify({
    requests: [
      {
        insertText: {
          text,
          endOfSegmentLocation: {
          },
        },
      },
    ],
  });

  const request = assign({}, POST, { body });
  return fetch(`https://docs.googleapis.com/v1/documents/${docId}:batchUpdate?access_token=${auth.access_token}`, request);
}
