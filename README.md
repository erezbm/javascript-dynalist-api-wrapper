# dynalist-api-wrapper
A JavaScript Dynalist API wrapper.

## Usage

### Node
```sh
npm install dynalist-api-wrapper
```
```js
const Dynalist = require('dynalist-api-wrapper');
const client = new Dynalist.Client('<a valid dynalist api token>');
```
OR if you are using ES Modules
```js
import { Client } from 'dynalist-api-wrapper';
const client = new Client('<a valid dynalist api token>');
```

### Browser
```html
<script src="https://unpkg.com/dynalist-api-wrapper"></script>
<script>
  const client = new Dynalist.Client('<a valid dynalist api token>');
</script>
```
OR
```js
import { Client } from 'https://unpkg.com/dynalist-api-wrapper/dist/browser/index.esm.js';

const client = new Client('<a valid dynalist api token>');
```
