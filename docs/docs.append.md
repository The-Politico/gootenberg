# docs.append(id, content)

Append content to the end of a Google Doc.

- `id` `<String>`: The Id for a Google Doc (see [here](../README.md#usage))
- `content` `<String>`: The text to append

## Example
```javascript
import Gootenberg from 'gootenberg';
import credentials from './credentials.json'

async function myFunc(){
  const goot = new Gootenberg();
  await goot.auth(credentials);

  await goot.docs.append('MY_DOC_ID', `\nLorem ipsum.`);
}

myFunc();
```
