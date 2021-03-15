![POLITICO](https://www.politico.com/interactives/cdn/images/badge.svg)

![gootenberg](docs/images/cover.png)

# Gootenberg
A tool for handling everything a news developer needs from the Google API.

## Why This?
Because news developers are writing their own utilities to process data from Google Drive for  special projects rigs, and we can make something better if we stop all that duplication.

## Installation

Install the package

```
$ npm install gootenberg
```

## Usage

Create a [Google Doc](https://www.google.com/docs/about/). Share it with your Google service account's client email (see [Authenticating](docs/GoogleServiceAccount.md)). Get the Doc ID for that document. You can find it in the URL between `d/` and `/edit` like this:

![docId](docs/images/docId.jpg)

Import it, create a new instance of `Gootenberg`, authenticate it with your Google credentials, and run one of its asynchronous functions.

```javascript
import Gootenberg from 'gootenberg';
import credentials from './credentials.json'

async function myFunc(){
  const goot = new Gootenberg();
  await goot.auth.jwt(credentials);

  const data = await goot.parse.archie('MY_DOC_ID');
}
```

## Methods

### auth
- [jwt](docs/auth.jwt.md)
- [oauth](docs/auth.oauth.md)

### docs
- [append](docs/docs.append.md)
- [create](docs/docs.create.md)
- [get](docs/docs.get.md)

### drive
- [comments](docs/drive.comments.md)
- [copy](docs/drive.copy.md)
- [export](docs/drive.export.md)
- [files](docs/drive.files.md)
- [getLastModified](docs/drive.getLastModified.md)
- [ls](docs/drive.ls.md)
- [move](docs/drive.move.md)
- [rename](docs/drive.rename.md)

### parse
- [archie](docs/parse.archie.md)
- [table](docs/parse.table.md)

### sheets
- [appendRows](docs/sheets.appendRows.md)
- [create](docs/sheets.create.md)
- [getAll](docs/sheets.getAll.md)

## Developing & Contributing
If you'd like to contribute, check out [these docs](docs/Developing.md).

## As a Microservice
If you're interested in setting Gootenberg up as an AWS Lambda microservice, check out [Gootenberg on Lambda.](https://github.com/The-Politico/gootenberg-lambda) There's some basic instructions on set up, but if you need more help, feel free to reach out.
