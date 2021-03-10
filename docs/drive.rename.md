# drive.rename(id, title)

Renames a file

- `id` `<String>`: The Id for a Google Drive file to rename.
- `title` `<Object>`: The new name with which to give it

## Example
```javascript
import Gootenberg from 'gootenberg';
import credentials from './credentials.json'

async function myFunc(){
  const goot = new Gootenberg();
  await goot.auth.jwt(credentials);

  await goot.drive.rename('MY_FILE_ID', 'New File Name');
}

myFunc();
```
