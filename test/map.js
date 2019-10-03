const query = ['theft', 'bob', 'dylan', 'albumet', 'bonsuplate', 'tiåret']
const result = ['love', 'and', 'theft', 'er', 'det', '31', 'studioalbumet', 'til', 'bob', 'dylan', 'og', 'ble', 'gitt', 'ut', 'gjennom', 'columbia', 'records', 'i', 'september', '2001', 'albumet', 'fortsatte', 'det', 'kunstneriske', 'comebacket', 'etter', 'time', 'out', 'of', 'mind', 'i', '1997', 'og', 'fekk', 'enda', 'bedre', 'mottakelse', 'enn', 'det', 'forrige', 'den', 'korrekte', 'tittelen', 'på', 'albumet', 'er', 'love', 'and', 'theft', 'med', 'engelske', 'anførselstegn', 'tittelen', 'var', 'visstnok', 'inspirert', 'av', 'en', 'bok', 'skrevet', 'av', 'historikeren', 'eric', 'lott', 'love', 'theft', 'blackface', 'minstrelsy', 'and', 'the', 'american', 'working', 'class', 'som', 'kom', 'ut', 'i', '1993', 'i', '2003', 'var', 'albumet', 'plassert', 'på', '467', 'plass', 'på', 'listen', 'til', 'rolling', 'stone', 'over', 'de', '500', 'største', 'albumene', 'noensinne', 'mens', 'newsweek', 'kåret', 'det', 'til', 'det', 'nest', 'beste', 'albumet', 'det', 'tiåret', '5', 'albumet', 'gikk', 'til', 'topps', 'i', 'norge', 'noen', 'utgaver', 'av', 'cden', 'ble', 'gitt', 'ut', 'med', 'en', 'bonusplate', 'med', 'to', 'spor', 'som', 'ikke', 'var', 'utgitt', 'før']
const properties = { itemMaxWords: 50 }

const defaultProperties = {
  itemMaxWords: 0,
  truncate: false,
  truncateStart: '...',
  truncateEnd: '...',
  hitCount: 0,
  hitPaddingMin: 3,
  highlightStart: '<span class="">',
  highlightEnd: '</span>',
  space: ' '
}

const highlight = function (queryArr, itemArr, properties) {
  properties = {
    ...defaultProperties,
    ...properties
  }

  // Check if item is to be truncated
  if (itemArr.length > properties.itemMaxWords && properties.itemMaxWords !== 0) {
    properties.truncate = true
  }

  // Set matched words to highlightable (true)
  itemArr = itemArr.map(function (itemWord) {
    const wordObj = {
      word: itemWord,
      highlightable: false
    }
    if (queryArr.find(function (queryWord) { return itemWord === queryWord })) {
      wordObj.highlightable = true
      properties.hitCount += 1
    }
    console.log(wordObj)
    return wordObj
  })

  console.log('hitCount: ' + properties.hitCount)

  if (itemArr.length >= properties.itemMaxWords && properties.itemMaxWords !== 0) {
    console.log(itemArr.length + ' >= ' + properties.itemMaxWords)
    truncate(itemArr)
  } else {
    console.log(itemArr.length + ' < ' + properties.itemMaxWords + ' OR itemMaxWords === 0')
  }
}

const truncate = function (item) {
  console.log(JSON.stringify(item))
}

highlight(query, result, properties)
