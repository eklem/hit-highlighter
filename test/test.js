// libraries
const highlight = require('../index.js')
const test = require('tape')

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

test('default highlighting', function (t) {
  t.plan(1)
  const query = ['interesting', 'words']
  const expectedResult = 'some <span class="hitHighlight">interesting words</span> to remember '
  const actualResult = highlight(query, item)
  t.looseEqual(actualResult, expectedResult)
})

test('no hit so no highlighting', function (t) {
  t.plan(1)
  const query = ['no', 'hits']
  const expectedResult = 'some interesting words to remember '
  const actualResult = highlight(query, item)
  t.looseEqual(actualResult, expectedResult)
})

test('markdown highlighting', function (t) {
  t.plan(1)
  const query = ['interesting', 'words']
  const expectedResult = 'some **interesting words** to remember '
  const actualResult = highlight(query, item, { highlightStart: '**', highlightEnd: '**' })
  t.looseEqual(actualResult, expectedResult)
})

test('Long item, no truncating', function (t) {
  t.plan(1)
  const query = ['studioalbumet', 'mottakelse', 'bedre', 'dylan', 'bob', 'working', 'class']
  const expectedResult = 'love and theft er det 31 <span class="hitHighlight">studioalbumet</span> til <span class="hitHighlight">bob dylan</span> og ble gitt ut gjennom columbia records i september 2001 albumet fortsatte det kunstneriske comebacket etter time out of mind i 1997 og fekk enda <span class="hitHighlight">bedre mottakelse</span> enn det forrige den korrekte tittelen på albumet er love and theft med engelske anførselstegn tittelen var visstnok inspirert av en bok skrevet av historikeren eric lott love theft blackface minstrelsy and the american <span class="hitHighlight">working class</span> som kom ut i 1993 i 2003 var albumet plassert på 467 plass på listen til rolling stone over de 500 største albumene noensinne mens newsweek kåret det til det nest beste albumet det tiåret 5 albumet gikk til topps i norge noen utgaver av cden ble gitt ut med en bonusplate med to spor som ikke var utgitt før '
  const actualResult = highlight(query, itemLong)
  t.looseEqual(actualResult, expectedResult)
})

test('Long item, truncating, but no cutoff', function (t) {
  t.plan(1)
  const query = ['studioalbumet', 'mottakelse', 'bedre', 'dylan', 'bob', 'working', 'class']
  const expectedResult = 'love and theft er det 31 <span class="hitHighlight">studioalbumet</span> til <span class="hitHighlight">bob dylan</span> og ble gitt ut gjennom columbia records i september ... time out of mind i 1997 og fekk enda <span class="hitHighlight">bedre mottakelse</span> enn det forrige den korrekte tittelen på albumet er ... eric lott love theft blackface minstrelsy and the american <span class="hitHighlight">working class</span> som kom ut i 1993 i 2003 var albumet ... '
  const actualResult = highlight(query, itemLong, { itemMaxWords: 80 })
  t.looseEqual(actualResult, expectedResult)
})

test('Long item, truncating, and cutoff query matches', function (t) {
  t.plan(1)
  const query = ['studioalbumet', 'mottakelse', 'bedre', 'dylan', 'bob', 'working', 'class']
  const expectedResult = 'and theft er det 31 <span class="hitHighlight">studioalbumet</span> til <span class="hitHighlight">bob dylan</span> og ble gitt ut gjennom ... i 1997 og fekk enda <span class="hitHighlight">bedre mottakelse</span> enn det forrige den korrekte ... '
  const actualResult = highlight(query, itemLong, { itemMaxWords: 40 })
  t.looseEqual(actualResult, expectedResult)
})
