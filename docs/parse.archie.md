# parse.archie(id)

Downloads and parses an [ArchieML-formatted](http://archieml.org) Google Doc into JSON data.

- `id` `<String>`: The Id for a Google Doc (see [here](../README.md#usage))
- `options` `<Object>`
  - `suggestionsViewMode` `<String>`: Defaults to `PREVIEW_WITHOUT_SUGGESTIONS`, but can be overridden to handle suggested edits in a different way. (see [the API docs](https://developers.google.com/docs/api/reference/rest/v1/documents#suggestionsviewmode)  for options).

## Example
```javascript
import Gootenberg from 'gootenberg';
import credentials from './credentials.json'

async function myFunc(){
  const goot = new Gootenberg();
  await goot.auth.jwt(credentials);

  const data = await goot.parse.archie('MY_DOC_ID');
}

myFunc();
```
