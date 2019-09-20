# hit-highlighter
A small and simple hit highlighter for search engines running in the browser and Node.js. Takes a query array and where the values matches within the item array, it adds hightight code.

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]
[![Build Status][travis-image]][travis-url]
[![JavaScript Style Guide][standardjs-image]][standardjs-url]

## Initialize

### Browser
```HTML
<script src="hit-highlighter.js"></script>

<script>
  //highlight() available
</script>
```

### Node.js
```javaScript
const highlight = require ('hit-highlight')
// highlight() available
```

## Usage
```javaScript
hightlight([query array], [item array], {highlighting})
```

`query` and `item` are arrays of words. `hightlighting` is an object defining `start` and `end` tag for what is highlighted.

`highlight.start` defaults to `<span class="highlighted">`
`highlight.end` defaults to `</span>`


### Default highlighting

```javaScript
const item = ['some', 'interesting', 'words', 'to', 'remember']
const query = ['interesting', 'words']

highlight(item, query)

// returns:
//[
//  'some',
//  '<span class="highlighted">interesting</span>',
//  '<span class="highlighted">words</span>',
//  'to',
//  'remember'
//]
```

### Custom highlight.start and .end

```javaScript
const item = ['some', 'interesting', 'words', 'to', 'remember']
const query = ['interesting', 'words']
const hightlight = { start: '**', end: '**' }

highlight(item, query, highlight)

// returns:
//[
//  'some',
//  '**interesting**',
//  '**words**',
//  'to',
//  'remember'
//]
```

### No hits, returing item untouched

```javaScript
const item = ['some', 'interesting', 'words', 'to', 'remember']
const query = ['no', 'hits']

highlight(item, query)

// returns:
//[
//  'some',
//  'interesting',
//  'words',
//  'to',
//  'remember'
//]
```

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
[npm-url]: https://npmjs.org/package/hit-highlighter
[npm-version-image]: https://img.shields.io/npm/v/hit-highlighter.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/hit-highlighter.svg?style=flat
[travis-url]: https://travis-ci.org/eklem/hit-highlighter
[travis-image]: https://img.shields.io/travis/eklem/hit-highlighter.svg?style=flat
[standardjs-url]: https://standardjs.com
[standardjs-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square