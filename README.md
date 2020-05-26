# hit-highlighter
A small and versatile hit highlighter for search engines running in the browser and Node.js. Language agnostic, meaning it supports all languages that can be split into words with code. 

Takes a query array and where the values matches within the search result array, it adds hightight code. Goes well with [words'n'numbers](https://github.com/eklem/words-n-numbers) for extracting words (and numbers) from a string of text.

Also part of [daq-proc](https://github.com/eklem/daq-proc), which is meant as a hassle free document and query processor for search engines running in the browser.

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]
[![Build Status][travis-image]][travis-url]
[![JavaScript Style Guide][standardjs-image]][standardjs-url]

# Browser demo
[![Browser demo](https://user-images.githubusercontent.com/236656/65326930-e68a5d80-dbb2-11e9-9ad4-c5b17e53c3f4.png)](https://eklem.github.io/hit-highlighter/demo/)

Check out the [demo](https://eklem.github.io/hit-highlighter/demo/) to better understand how the hit-highlighter works.


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
hightlight([query array], [item array], {prpoerties})
```

`query` and `item` are arrays of words. `properties` is optional to define, since you have defaultProperties:
```javaScript
defaultProperties = {
  itemMaxWords: 0,
  truncateStart: '<span class="truncated">',
  truncateEnd: '</span>',
  hitPaddingMin: 5,
  highlightStart: '<span class="hitHighlight">',
  highlightEnd: '</span>',
  divider: ' '
}
```

If you want to overwrite anything, i.e. maximum words to show in an item, you can do:
```javaScript
hightlight([query array], [item array], {itemMaxWords: 100})
```

### Default highlighting

```javaScript
const query = ['interesting', 'words']
const item = ['some', 'interesting', 'words', 'to', 'remember']

highlight(query, item)

// returns:
// 'some <span class="hitHighlight">interesting words</span> to remember '
```

### Custom highlight.start and .end

```javaScript
const query = ['interesting', 'words']
const item = ['some', 'interesting', 'words', 'to', 'remember']
const properties = { highlightStart: '**', highlightEnd: '**' }

highlight(query, item, properties)

// returns:
// 'some **interesting words** to remember '
```

### No hits, returing item untouched

```javaScript
const query = ['no', 'hits']
const item = ['some', 'interesting', 'words', 'to', 'remember']

highlight(query, item)

// returns:
// 'some interesting words to remember '
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