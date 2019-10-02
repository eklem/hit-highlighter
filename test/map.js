const item = ['love', 'and', 'theft', 'er', 'det', '31', 'studioalbumet', 'til', 'bob', 'dylan', 'og', 'ble', 'gitt', 'ut', 'gjennom', 'columbia', 'records', 'i', 'september', '2001', 'albumet', 'fortsatte', 'det', 'kunstneriske', 'comebacket', 'etter', 'time', 'out', 'of', 'mind', 'i', '1997', 'og', 'fekk', 'enda', 'bedre', 'mottakelse', 'enn', 'det', 'forrige', 'den', 'korrekte', 'tittelen', 'på', 'albumet', 'er', 'love', 'and', 'theft', 'med', 'engelske', 'anførselstegn', 'tittelen', 'var', 'visstnok', 'inspirert', 'av', 'en', 'bok', 'skrevet', 'av', 'historikeren', 'eric', 'lott', 'love', 'theft', 'blackface', 'minstrelsy', 'and', 'the', 'american', 'working', 'class', 'som', 'kom', 'ut', 'i', '1993', 'i', '2003', 'var', 'albumet', 'plassert', 'på', '467', 'plass', 'på', 'listen', 'til', 'rolling', 'stone', 'over', 'de', '500', 'største', 'albumene', 'noensinne', 'mens', 'newsweek', 'kåret', 'det', 'til', 'det', 'nest', 'beste', 'albumet', 'det', 'tiåret', '5', 'albumet', 'gikk', 'til', 'topps', 'i', 'norge', 'noen', 'utgaver', 'av', 'cden', 'ble', 'gitt', 'ut', 'med', 'en', 'bonusplate', 'med', 'to', 'spor', 'som', 'ikke', 'var', 'utgitt', 'før']
const query = ['bob', 'dylan', 'albumet', 'bonsuplate', 'tiåret']

const defaultProperties = {
  itemMaxWords: 0,
  hitCount: 0,
  hitPadding: 3,
  highlightStart: '<span class="">',
  highlightEnd: '</span>'
}

const properties = {
  itemMaxWords: 0
}

const highlight = function (query, items, properties) {
  properties = {
    ...defaultProperties,
    ...properties
  }

  items.map(function (itemWord) {
    if (query.find(function (queryWord) { return itemWord === queryWord })) {
      console.log(itemWord)
      properties.hitCount += 1
    }
  })

  console.log('hitCount: ' + properties.hitCount)

  if (items.length >= properties.itemMaxWords && properties.itemMaxWords !== 0) {
    console.log(items.length + ' >= ' + properties.itemMaxWords)
    truncate(items)
  } else {
    console.log(items.length + ' < ' + properties.itemMaxWords + ' OR itemMaxWords === 0')
  }
}

const truncate = function (items) {
  console.log('truncate: ' + items)
}

highlight(query, item, properties)
