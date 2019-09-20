# hit-highlighter
A small and simple hit highlighter for search engines running in the browser and Node.js

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]
[![Build Status][travis-image]][travis-url]
[![JavaScript Style Guide][standardjs-image]][standardjs-url]

## Initialize

### Node.js
```javaScript
const highlight = require ('hit-highlight')
// highlight available
```

## Usage

```javaScript
hightlight([query array], [item array], {highlighting})
```

* query array
* item array
* highlight object

### Output:
Item array with highlighting tags

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
[npm-url]: https://npmjs.org/package/hit-highlighter
[npm-version-image]: https://img.shields.io/npm/v/hit-highlighter.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/hit-highlighter.svg?style=flat
[travis-url]: https://travis-ci.org/eklem/hit-highlighter
[travis-image]: https://img.shields.io/travis/eklem/hit-highlighter.svg?style=flat
[standardjs-url]: https://standardjs.com
[standardjs-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square