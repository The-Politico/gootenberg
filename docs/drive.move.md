# drive.move(src, destination)

Moves files from one directory to another.

- `src` `<String>`: The Id for a Google Drive file to move.
- `destination` `<Object>`: The Id of a Google Drive directory to move it to

## Example
```javascript
import Gootenberg from 'gootenberg';
import credentials from './credentials.json'

async function myFunc(){
  const goot = new Gootenberg();
  await goot.auth.jwt(credentials);

  await goot.drive.move('MY_FILE_ID', 'MY_FOLDER_ID');
}

myFunc();
```
