# drive.getLastModified(id)

Gets the last modified time of the the file. Unlike many functions in Gootenberg, this one returns a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object.

- `id` `<String>`: The Id for a Google Drive file (see [here](../README.md#usage))

## Example
```javascript
import Gootenberg from 'gootenberg';
import credentials from './credentials.json'

async function myFunc(){
  const goot = new Gootenberg();
  await goot.auth.jwt(credentials);

  const lastModifiedDatetime = await goot.drive.getLastModified('MY_FILE_ID');
  console.log(lastModifiedDatetime);
}

myFunc();
```
