# docs.create(title, \[directory\])

Create a new Google Document. If you choose not to provide a directory, you might not be able to see it if you're using a service account.


- `title` `<String>`: The name of the new document
- `directory` `<String>`: The Google Id of the new file's directory

## Example
```javascript
import Gootenberg from 'gootenberg';
import credentials from './credentials.json'

async function myFunc(){
  const goot = new Gootenberg();
  await goot.auth.jwt(credentials);

  await goot.docs.create('My New File', 'MY_FOLDER_ID');
}

myFunc();
```
