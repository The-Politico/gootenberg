# docs.append(id, content)

Append content to the end of a Google Doc. Check out [the official docs](https://developers.google.com/docs/api/reference/rest/v1/documents/get?apix_params=%7B%22documentId%22%3A%221aQjMYGik1UaqyyM-Ruyx9QwILwBzmkYyVOqCHR6641U%22%7D) for an example of the output.

- `id` `<String>`: The Id for a Google Doc (see [here](../README.md#usage))

## Example
```javascript
import Gootenberg from 'gootenberg';
import credentials from './credentials.json'

async function myFunc(){
  const goot = new Gootenberg();
  await goot.auth.jwt(credentials);

  await goot.docs.get('MY_DOC_ID');
}

myFunc();
```
