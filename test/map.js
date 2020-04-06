const query = ['theft', 'bob', 'dylan', 'records', 'albumet', 'bonsuplate', 'tiåret', 'columbia', 'gjennom']
const result = ['love', 'and', 'theft', 'er', 'det', '31', 'studioalbumet', 'til', 'bob', 'dylan', 'og', 'ble', 'gitt', 'ut', 'gjennom', 'columbia', 'records', 'i', 'september', '2001', 'albumet', 'fortsatte', 'det', 'kunstneriske', 'comebacket', 'etter', 'time', 'out', 'of', 'mind', 'i', '1997', 'og', 'fekk', 'enda', 'bedre', 'mottakelse', 'enn', 'det', 'forrige', 'den', 'korrekte', 'tittelen', 'på', 'albumet', 'er', 'love', 'and', 'theft', 'med', 'engelske', 'anførselstegn', 'tittelen', 'var', 'visstnok', 'inspirert', 'av', 'en', 'bok', 'skrevet', 'av', 'historikeren', 'eric', 'lott', 'love', 'theft', 'blackface', 'minstrelsy', 'and', 'the', 'american', 'working', 'class', 'som', 'kom', 'ut', 'i', '1993', 'i', '2003', 'var', 'albumet', 'plassert', 'på', '467', 'plass', 'på', 'listen', 'til', 'rolling', 'stone', 'over', 'de', '500', 'største', 'albumene', 'noensinne', 'mens', 'newsweek', 'kåret', 'det', 'til', 'det', 'nest', 'beste', 'albumet', 'det', 'tiåret', '5', 'albumet', 'gikk', 'til', 'topps', 'i', 'norge', 'noen', 'utgaver', 'av', 'cden', 'ble', 'gitt', 'ut', 'med', 'en', 'bonusplate', 'med', 'to', 'spor', 'som', 'ikke', 'var', 'utgitt', 'før']
const properties = { itemMaxWords: 33 }

const defaultProperties = {
  itemMaxWords: 0,
  truncate: false,
  truncateStart: '',
  truncateEnd: '...',
  hitPaddingMin: 5,
  highlightStart: '<span class="hitHighlight">',
  highlightEnd: '</span>',
  space: ' '
}

const highlight = function (queryArr, itemArr, properties) {
  properties = {
    ...defaultProperties,
    ...properties
  }
  let hitArr = []
  const hitPaddedArr = []
  let hitCount = 0
  const hitPadding = properties.hitPaddingMin

  console.log('query array: ' + queryArr)
  console.log('result array: ' + itemArr)

  // A: Check if item is to be truncated
  if (itemArr.length > properties.itemMaxWords && properties.itemMaxWords !== 0) {
    properties.truncate = true
    // console.log('properties.truncate: ' + properties.truncate)
  }

  // B: Set matched words to highlightable (true)
  itemArr = itemArr.map(function (itemWord, index) {
    const wordObj = {
      word: itemWord
    }
    if (queryArr.find(function (queryWord) { return itemWord === queryWord })) {
      wordObj.highlightable = true
      hitCount += 1
    }
    // console.log(wordObj)
    return wordObj
  })

  // C: Joining neighbour highlightable words, removing redundant and setting index value
  for (let i = 0; i < itemArr.length; i++) {
    if (i > 0 && itemArr[i].highlightable && itemArr[i - 1].highlightable) {
      // Joining this and previous word
      itemArr[i].word = itemArr[i - 1].word + properties.space + itemArr[i].word
      // Removing previous word from array
      itemArr.splice(i - 1, 1)
      // fixing array count
      i = i - 1
    }
    // setting index on all highlightable
    if (itemArr[i].highlightable) {
      itemArr[i].index = i
    }
  }

  itemArr = itemArr.map(function (itemWord, index) {
    if (itemWord.highlightable) {
      itemWord.word = properties.highlightStart + itemWord.word + properties.highlightEnd
    }
    return itemWord
  })

  // D: Defining index on highlightable words and pushing to itemArr
  //    Adding highlightStart and highlightEnd to words / terms
  hitArr = itemArr.filter(itemArr => itemArr.highlightable)
  console.log(itemArr)
  console.log(hitArr)

  // E: Calculating padding array of arrays
  //    Caluclataing how much padding
  //    Calculate many padding arrays and/or how much padding
  //    Join hits
  //    Populate array
  //    Adding truncateStart and truncateEnd to hits with padding, start is not 0 and end is not itemArr.length - 1
  //    Stringifying & returning that string

  console.log('Number of hits to be padded: ' + hitArr.length)
  console.log('Number words hit: ' + hitCount)
  console.log('Max words per item: ' + properties.itemMaxWords)

  // Do a minimum calculation, based on hitPaddingMin, hitArr.length and properties.itemMaxWords
  //  If less than or equal to itemMaxWords: do one more calculation, expanding hitPadding to something sensible
  //  !!! Should have a test on only one query word
  //  If more than itemMaxWords: calculate how many hits to use from hitArr
  if (hitArr.length * (hitPadding * 2) <= properties.itemMaxWords) {
    console.log('Keep the whole hitArr with padding')
  } else if (hitArr.length * (hitPadding * 2) > properties.itemMaxWords) {
    console.log('We need to cut off, but how much?\nHere is some calculation:')
    // per hit
    const totalWords = hitArr.length * ((hitPadding * 2) + 1)
    const wordsPerHit = (hitPadding * 2) + 1
    const wordsToMany = totalWords - properties.itemMaxWords
    //  how many hits to cut off
    const hitsToKeep = hitArr.length - (Math.ceil(wordsToMany / wordsPerHit))
    console.log('How many hits to keep: ' + hitsToKeep)
    hitArr = hitArr.slice(0, hitsToKeep)
    console.log(hitArr)
  }

  // Padding etc
  for (let i = 0; i < hitArr.length; i++) {
    // do some padding stuff...
    hitArr[i].paddStart = Math.max(hitArr[i].index - hitPadding, 0)
    hitArr[i].paddEnd = Math.min(hitArr[i].index + hitPadding, itemArr.length - 1)
  }
  console.log(hitArr)

  // finding boundaries for paddingGroups
  for (let i = 0; i < hitArr.length; i++) {
    if (i > 0 && hitArr[i].paddStart <= hitArr[i - 1].paddEnd) {
      // join this and next
      hitArr[i].paddStart = hitArr[i - 1].paddStart
      // Removing previous padding group from index
      hitArr.splice(i - 1, 1)
      // fixing array count
      i = i - 1
      console.log('processed: ' + JSON.stringify(hitArr[i]))
    }
  }
  console.log(hitArr)

  // slice itemArr with info from hitArr and push to hitPaddedArr
  for (let i = 0; i < hitArr.length; i++) {
    hitPaddedArr[i] = itemArr.slice(hitArr[i].paddStart, hitArr[i].paddEnd)
  }
  console.log(hitPaddedArr)
}

highlight(query, result, properties)
