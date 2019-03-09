# Developing

Clone this repo, then:

```bash
# install dependencies
npm install

# build application
npm run build

# run tests
npm run test
```

Note that you'll need a file called `credentials.json` in your repo's root directory with the credentials for a service account with access to the test docs. Contact Andrew Briz to request access for your service account.

## Contributing

If you'd like to help, you can fork this repo and make pull requests. Before you do however I ask that you read the following philosophy.

An instance of `Gootenberg` (or `goot`) is meant to be an all-in-one communicator between Google APIs and the user. As such, any additional methods should extend the main class's functionality. Those `methods` are broken down by `family` with their own folders inside `src/`. These families include `docs` manipulation, `sheets` manipulation, and broader `drive` manipulation (as organized by Google's APIs). I've also added the `parse` category to take care of the more common use cases of news developers. Calling these functions is then done with `goot.FAMILY.METHOD(args)`.

Any methods that don't fit in a `family` belong at the top-level (though this should be done sparingly) and are called directly with `goot.METHOD(args)`.

### Creating a New Method
If you'd like to extend `Gootenberg`'s functionality by adding a `method` to an existing `family`, start with the method itself. Create a file (or a directory with an `index.js` file) inside the family's folder. This file should have a function as a default export.

You can use the `this` keyword in your function to refer to the calling `goot`. This allows you to use existing methods (such as `this.drive.export()`) in your method. Note that if you export an arrow function, the `this` keyword will be unbound, and will return undefined.

The function should return a promise to maintain cohesion throughout the whole project. You can make your function `async` to return a promise by default.

For sake of example we'll use `getLength.js` inside the `parse` family which returns the length of a document.

```javascript
// src/parse/getLength.js
export default async function(id){
  const text = await this.drive.export(id);
  return text.length;
}
```

Once you have your method file, you must export it in its `family`'s `index.js` file:

```javascript
// src/parse/index.js

...

export { default as getLength } from './getLength';
```

Once you do this your function will be available to any instance of `Gootenberg` via it's `family` name:

```javascript
import Gootenberg from 'gooternberg';
import credentials from './credentials.json'

async function myFunc(){
  const goot = new Gootenberg();
  await goot.auth(credentials);

  const data = await goot.parse.getLength('MY_DOC_ID');
  console.log(data);
}

myFunc();
```

Once you've tested your function, make sure to add a documentation file in `docs/`. Your file should be called `FAMILY.METHOD.md`. It should include the family name, method name, arguments, example use, and an example data payload if it returns any data. You can use the following template to get you started:

````markdown
# FAMILY.METHOD(ARGS)

Brief description of what your method does.

- `arg_name` `<arg_type>`: Brief description of the arg

## Example
```javascript
import Gootenberg from 'gooternberg';
import credentials from './credentials.json'

async function myFunc(){
  const goot = new Gootenberg();
  await goot.auth(credentials);

  const data = await goot.FAMILY.METHOD();
  console.log(data);
}

myFunc();
```

## Example Data
```json
[
  SOME DATA
]
```
````

Finally, add your method with a link to its doc file to the [README](../README.md).

### Creating a New Family
If you'd like to create a whole new `family` make sure the functionality you're adding isn't already covered. If you're implementing an existing Google API method, it should likely go in the family for whichever API you're using (e.g. Sheets API methods belong to the `sheets` family).

If you're sure, start by creating a new folder in the `src/` directory with the name of your family. Create a file inside called `index.js`.

Create at least one method inside that directory and export it in your `index.js` file (see instructions above).

Then in `src/index.js` import your family and map each function to the `Gootenberg` prototype by using the `mapValues` function.

```javascript

...

import * as exampleMethods from './exampleFamily';


class Gootenberg {

  ...

  example = mapValues(exampleMethods, m => m.bind(this));
}

...

```
