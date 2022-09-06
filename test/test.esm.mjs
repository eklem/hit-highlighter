// libraries
import test from 'ava'
import { highlight } from '../dist/hit-highlighter.cjs.js'

// data
const item = ['some', 'interesting', 'words', 'to', 'remember']
const itemLong = ['love', 'and', 'theft', 'er', 'det', '31', 'studioalbumet', 'til', 'bob', 'dylan', 'og', 'ble', 'gitt',
  'ut', 'gjennom', 'columbia', 'records', 'i', 'september', '2001', 'albumet', 'fortsatte', 'det', 'kunstneriske',
  'comebacket', 'etter', 'time', 'out', 'of', 'mind', 'i', '1997', 'og', 'fekk', 'enda', 'bedre', 'mottakelse', 'enn',
  'det', 'forrige', 'den', 'korrekte', 'tittelen', 'på', 'albumet', 'er', 'love', 'and', 'theft', 'med', 'engelske',
  'anførselstegn', 'tittelen', 'var', 'visstnok', 'inspirert', 'av', 'en', 'bok', 'skrevet', 'av', 'historikeren',
  'eric', 'lott', 'love', 'theft', 'blackface', 'minstrelsy', 'and', 'the', 'american', 'working', 'class', 'som',
  'kom', 'ut', 'i', '1993', 'i', '2003', 'var', 'albumet', 'plassert', 'på', '467', 'plass', 'på', 'listen', 'til',
  'rolling', 'stone', 'over', 'de', '500', 'største', 'albumene', 'noensinne', 'mens', 'newsweek', 'kåret', 'det',
  'til', 'det', 'nest', 'beste', 'albumet', 'det', 'tiåret', '5', 'albumet', 'gikk', 'til', 'topps', 'i', 'norge',
  'noen', 'utgaver', 'av', 'cden', 'ble', 'gitt', 'ut', 'med', 'en', 'bonusplate', 'med', 'to', 'spor', 'som', 'ikke',
  'var', 'utgitt', 'før']

// Debugging: https://github.com/eklem/hit-highlighter/issues/19
const itemBug = ['some', 'text', 'that', 'resembles', 'a', 'search', 'result', 'item', 'with', 'lots', 'of', 'nice', 'words', 'to', 'match', 'at', 'least', 'some', 'of', 'the', 'query', 'input', 'and', 'we', 'can', 'make', 'it', 'longer', 'by', 'adding', 'even', 'more', 'interesting', 'text', 'so', 'that', 'maximum', 'words', 'limit', 'gets', 'interesting']

test('default highlighting', (t) => {
  const query = ['interesting', 'words']
  const expectedResult = 'some <span class="hitHighlight">interesting words</span> to remember '
  const actualResult = highlight(query, item)
  t.deepEqual(actualResult, expectedResult)
})

test('no hit so no highlighting', (t) => {
  const query = ['no', 'hits']
  const expectedResult = 'some interesting words to remember'
  const actualResult = highlight(query, item)
  t.deepEqual(actualResult, expectedResult)
})

test('no hit so no highlighting, but truncated / sliced', (t) => {
  const query = ['no', 'hits']
  const expectedResult = '<span class="truncated">love and theft er det 31 studioalbumet til bob dylan og ble gitt ut gjennom columbia records i september 2001</span>'
  const actualResult = highlight(query, itemLong, { itemMaxWords: 20 })
  t.deepEqual(actualResult, expectedResult)
})

test('markdown highlighting', (t) => {
  const query = ['interesting', 'words']
  const expectedResult = 'some **interesting words** to remember '
  const actualResult = highlight(query, item, { highlightStart: '**', highlightEnd: '**' })
  t.deepEqual(actualResult, expectedResult)
})

test('Long item, no truncating', (t) => {
  const query = ['studioalbumet', 'mottakelse', 'bedre', 'dylan', 'bob', 'working', 'class']
  const expectedResult = 'love and theft er det 31 <span class="hitHighlight">studioalbumet</span> til <span class="hitHighlight">bob dylan</span> og ble gitt ut gjennom columbia records i september 2001 albumet fortsatte det kunstneriske comebacket etter time out of mind i 1997 og fekk enda <span class="hitHighlight">bedre mottakelse</span> enn det forrige den korrekte tittelen på albumet er love and theft med engelske anførselstegn tittelen var visstnok inspirert av en bok skrevet av historikeren eric lott love theft blackface minstrelsy and the american <span class="hitHighlight">working class</span> som kom ut i 1993 i 2003 var albumet plassert på 467 plass på listen til rolling stone over de 500 største albumene noensinne mens newsweek kåret det til det nest beste albumet det tiåret 5 albumet gikk til topps i norge noen utgaver av cden ble gitt ut med en bonusplate med to spor som ikke var utgitt før '
  const actualResult = highlight(query, itemLong)
  t.deepEqual(actualResult, expectedResult)
})

test('Long item, truncating, but no cutoff', (t) => {
  const query = ['studioalbumet', 'mottakelse', 'bedre', 'dylan', 'bob', 'working', 'class']
  const expectedResult = '<span class="truncated">love and theft er det 31 <span class="hitHighlight">studioalbumet</span> til <span class="hitHighlight">bob dylan</span> og ble gitt ut gjennom columbia records i september </span><span class="truncated">time out of mind i 1997 og fekk enda <span class="hitHighlight">bedre mottakelse</span> enn det forrige den korrekte tittelen på albumet er </span><span class="truncated">eric lott love theft blackface minstrelsy and the american <span class="hitHighlight">working class</span> som kom ut i 1993 i 2003 var albumet </span>'
  const actualResult = highlight(query, itemLong, { itemMaxWords: 80 })
  t.deepEqual(actualResult, expectedResult)
})

test('Long item, truncating, and cutoff query matches', (t) => {
  const query = ['studioalbumet', 'mottakelse', 'bedre', 'dylan', 'bob', 'working', 'class']
  const expectedResult = '<span class="truncated">and theft er det 31 <span class="hitHighlight">studioalbumet</span> til <span class="hitHighlight">bob dylan</span> og ble gitt ut gjennom </span><span class="truncated">i 1997 og fekk enda <span class="hitHighlight">bedre mottakelse</span> enn det forrige den korrekte </span>'
  const actualResult = highlight(query, itemLong, { itemMaxWords: 40 })
  t.deepEqual(actualResult, expectedResult)
})

test('Debugging an error, truncate group with too little padding at the end', (t) => {
  const query = ['some', 'query', 'words']
  const expectedResult = '<span class="truncated"><span class="hitHighlight">some</span> text that resembles a search </span><span class="truncated">item with lots of nice <span class="hitHighlight">words</span> to match at least <span class="hitHighlight">some</span> of the <span class="hitHighlight">query</span> input and </span>'
  const actualResult = highlight(query, itemBug, { itemMaxWords: 40 })
  t.deepEqual(actualResult, expectedResult)
})
