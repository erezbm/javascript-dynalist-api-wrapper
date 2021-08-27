# DEPRECIATED: dynalist-api-wrapper
A JavaScript [Dynalist](https://dynalist.io) [API](https://apidocs.dynalist.io) wrapper.

## WARNING
This library is no longer maintained.  
This library supports the Dynalist API version from November 2020 (it might still be fine to use for things that have not changed since then).

## Installation

### Node
Run `npm install dynalist-api-wrapper`, then load the package:

CommonJS:
```js
const Dynalist = require('dynalist-api-wrapper');
```
ES Modules:
```js
import * as Dynalist from 'dynalist-api-wrapper';
```

### Browser
Add this script tag to your html, which will add Dynalist as a global:
```html
<script src="https://unpkg.com/dynalist-api-wrapper"></script>
```
**OR** import the ES Modules version for the browser:
```js
import * as Dynalist from 'https://unpkg.com/dynalist-api-wrapper/dist/browser/index.esm.js';
```

## Usage
```js
const client = new Dynalist.Client('<a valid dynalist api token>');
const response = await client.listDocumentsAndFolders();
if (response._code === 'Ok') {
  console.log('Root file id:', response.root_file_id);
  console.log('Files:', response.files);
}
```

For full documentation use IntelliSense in your code editor.
