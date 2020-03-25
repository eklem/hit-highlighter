const query = ['theft', 'bob', 'dylan', 'records', 'albumet', 'bonsuplate', 'tiåret', 'columbia', 'gjennom']
const result = ['love', 'and', 'theft', 'er', 'det', '31', 'studioalbumet', 'til', 'bob', 'dylan', 'og', 'ble', 'gitt', 'ut', 'gjennom', 'columbia', 'records', 'i', 'september', '2001', 'albumet', 'fortsatte', 'det', 'kunstneriske', 'comebacket', 'etter', 'time', 'out', 'of', 'mind', 'i', '1997', 'og', 'fekk', 'enda', 'bedre', 'mottakelse', 'enn', 'det', 'forrige', 'den', 'korrekte', 'tittelen', 'på', 'albumet', 'er', 'love', 'and', 'theft', 'med', 'engelske', 'anførselstegn', 'tittelen', 'var', 'visstnok', 'inspirert', 'av', 'en', 'bok', 'skrevet', 'av', 'historikeren', 'eric', 'lott', 'love', 'theft', 'blackface', 'minstrelsy', 'and', 'the', 'american', 'working', 'class', 'som', 'kom', 'ut', 'i', '1993', 'i', '2003', 'var', 'albumet', 'plassert', 'på', '467', 'plass', 'på', 'listen', 'til', 'rolling', 'stone', 'over', 'de', '500', 'største', 'albumene', 'noensinne', 'mens', 'newsweek', 'kåret', 'det', 'til', 'det', 'nest', 'beste', 'albumet', 'det', 'tiåret', '5', 'albumet', 'gikk', 'til', 'topps', 'i', 'norge', 'noen', 'utgaver', 'av', 'cden', 'ble', 'gitt', 'ut', 'med', 'en', 'bonusplate', 'med', 'to', 'spor', 'som', 'ikke', 'var', 'utgitt', 'før']
const properties = { itemMaxWords: 33 }

const defaultProperties = {
  itemMaxWords: 0,
  truncate: false,
  truncateStart: '...',
  truncateEnd: '...',
  hitCount: 0,
  hitPaddingMin: 5,
  highlightStart: '<span class="">',
  highlightEnd: '</span>',
  space: ' '
}

const highlight = function (queryArr, itemArr, properties) {
  properties = {
    ...defaultProperties,
    ...properties
  }
  // const hitArrays = []
  // console.log('hitArrays: ' + hitArrays)

  console.log('Query array: ' + JSON.stringify(queryArr))

  // Check if item is to be truncated
  if (itemArr.length > properties.itemMaxWords && properties.itemMaxWords !== 0) {
    properties.truncate = true
    // console.log('properties.truncate: ' + properties.truncate)
  }

  // Set matched words to highlightable (true)
  itemArr = itemArr.map(function (itemWord, index) {
    const wordObj = {
      word: itemWord,
      highlightable: false,
      index: index
    }
    if (queryArr.find(function (queryWord) { return itemWord === queryWord })) {
      wordObj.highlightable = true
      properties.hitCount += 1
    }
    // console.log(wordObj)
    return wordObj
  })

  // Join highlightable words
  itemArr = itemArr.map(function (wordObj, i, itemArr) {
    // console.log('wordObj: ' + JSON.stringify(wordObj))
    console.log(wordObj.highlightable)

    // Check if next word is highlightable and join
    if (wordObj.highlightable && itemArr[wordObj.index - 1].highlightable) {
      console.log('this: ' + wordObj.word)
      console.log('prev: ' + itemArr[wordObj.index - 1].word)
      // console.log('highlightable: ' + wordObj.index)
      wordObj.word = itemArr[wordObj.index - 1].word + properties.space + wordObj.word
      // remove next element from array
      delete itemArr[wordObj.index - 1]
      console.log('wordObj joined: ' + JSON.stringify(wordObj))
    }
    return wordObj
  })

  console.log('hitCount: ' + properties.hitCount)
  const wordPerHighlight = Math.trunc(properties.itemMaxWords / properties.hitCount)
  console.log('Truncated - Number of words per highlight: ' + wordPerHighlight)

  if (itemArr.length >= properties.itemMaxWords && properties.itemMaxWords !== 0) {
    console.log('truncating here...')
    truncate(itemArr)
  } else {
    console.log('not truncating here...')
  }
}

// Truncating result item and padding them
const truncate = function (itemArr) {
  // console.log(JSON.stringify(itemArr))
}

highlight(query, result, properties)
