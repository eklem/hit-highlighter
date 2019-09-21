# hit-highlighter
A small and simple hit highlighter for search engines running in the browser and Node.js. Takes a query array and where the values matches within the item array, it adds hightight code. Goes well with [words'n'numbers](https://github.com/eklem/words-n-numbers) for extracting words (and numbers) from a string of text.

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]
[![Build Status][travis-image]][travis-url]
[![JavaScript Style Guide][standardjs-image]][standardjs-url]

# Browser demo
[![Browser demo](https://user-images.githubusercontent.com/236656/65326930-e68a5d80-dbb2-11e9-9ad4-c5b17e53c3f4.png)](https://eklem.github.io/hit-highlighter/demo/)

Check out the [interactive demo](https://eklem.github.io/hit-highlighter/demo/).


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
hightlight([query array], [item array], {highlighting object})
```

`query` and `item` are arrays of words. `hightlighting` is an object defining `start` and `end` tag for what is highlighted.

`highlighting.start` defaults to `<span class="highlighted">`
`highlighting.end` defaults to `</span>`


### Default highlighting

```javaScript
const query = ['interesting', 'words']
const item = ['some', 'interesting', 'words', 'to', 'remember']

highlight(query, item)

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
const query = ['interesting', 'words']
const item = ['some', 'interesting', 'words', 'to', 'remember']
const highlighting = { start: '**', end: '**' }

highlight(query, item, highlighting)

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
const query = ['no', 'hits']
const item = ['some', 'interesting', 'words', 'to', 'remember']

highlight(query, item)

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