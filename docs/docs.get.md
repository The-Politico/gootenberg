# docs.get(id)

Get the content of a Google document.

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
