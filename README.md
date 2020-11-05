# dynalist.js
A JavaScript Dynalist API wrapper.

## Usage

### Node
```sh
npm install dynalist.js
```
```js
const Dynalist = require('dynalist.js');
const client = new Dynalist.Client('<a valid dynalist api token>');
```
OR if you are using ES Modules
```js
import { Client } from 'dynalist.js';
const client = new Client('<a valid dynalist api token>');
```

### Browser
```html
<script src="https://unpkg.com/dynalist.js"></script>
<script>
  const client = new Dynalist.Client('<a valid dynalist api token>');
</script>
```
OR
```js
import { Client } from 'https://unpkg.com/dynalist.js/dist/browser/index.esm.js';

const client = new Client('<a valid dynalist api token>');
```
