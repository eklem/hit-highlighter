const query = ['studioalbumet', 'mottakelse', 'bedre', 'dylan', 'bob', 'working', 'class']
const result = ['love', 'and', 'theft', 'er', 'det', '31', 'studioalbumet', 'til', 'bob', 'dylan', 'og', 'ble', 'gitt',
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
const properties = { itemMaxWords: 135 }

console.log(query)

const highlight = function (queryArr, itemArr, properties) {
  const defaultProperties = {
    itemMaxWords: 0,
    truncateStart: '...',
    truncateEnd: '... ',
    hitPaddingMin: 5,
    highlightStart: '<span class="hitHighlight">',
    highlightEnd: '</span>',
    divider: ' '
  }

  properties = {
    ...defaultProperties,
    ...properties
  }
  console.log(properties)

  const cases = {
    hitCount: 0,
    truncate: false,
    keepAllQueryWords: true,
    toLittlePadding: false
  }

  let hitArr = []
  let hitTruncatedArr = []
  let item = ''

  // ##################################################
  // # Preparing & preprocessing for hit highlighting #
  // ##################################################

  // A: Check if item is to be truncated
  if (caseTruncate(itemArr.length, properties)) {
    cases.truncate = true
    console.log('Truncate: true')
  } else {
    console.log('Truncate: false')
  }

  // B: Set matched words to highlightable (true) in itemArr
  itemArr = setHighlightables(itemArr, queryArr, cases)
  console.log('hitCount: ' + cases.hitCount)

  // C: Joining neighbour highlightable words, removing redundant and setting index value
  //    And add highlight start and end
  itemArr = joinNeighbourHighlightable(itemArr, properties)
  itemArr = addHighlighting(itemArr, properties)

  // D: Defining index on highlightable words and pushing to hitArr
  hitArr = itemArr.filter(itemArr => itemArr.highlightable)

  // E: Calculating padding array of arrays
  //    Caluclataing how much padding
  //    Calculate many padding arrays and/or how much padding
  //    Join hits
  //    Populate array
  //    Adding truncateStart and truncateEnd to hits with padding, start is not 0 and end is not itemArr.length - 1
  //    Stringifying & returning that string

  // Check if to keep all query wordsCut off hit array
  if (caseKeepAllQueryWords(hitArr, properties)) {
    cases.keepAllQueryWords = true
  } else {
    // this needs to be moved later
    cases.keepAllQueryWords = false
  }
  console.log('properties and cases: ')
  console.log(properties)
  console.log(cases)

  // ############################
  // # The highlighter "switch" #
  // ############################

  if (!cases.truncate) {
    // just return the highlighted itemArray
    console.log('### Case - Just highlight ###')
  } else if (cases.truncate && cases.keepAllQueryWords) {
    // needs truncating, but keep all query words
    console.log('### Case - Truncat but keep all query word hits ###')
    // Calculate Padding start and end for each hit
    hitArr = setPaddingStartEnd(hitArr, itemArr.length, properties)
    hitArr = joinOverlappingTruncate(hitArr)
    hitTruncatedArr = truncateHitArr(hitArr, itemArr, hitTruncatedArr)
    item = getHighlightedString(hitTruncatedArr, properties.truncateStart, properties.truncateEnd, properties.divider)
    console.log(item)
  } else if (cases.truncate && !cases.keepAllQueryWords) {
    // needs truncadting and have to cut off query wors
    console.log('### Case - Truncat and cut off some query word hits ###')
    hitArr = cutOffHitArray(hitArr, properties)
    hitArr = setPaddingStartEnd(hitArr, itemArr.length, properties)
    hitArr = joinOverlappingTruncate(hitArr)
    hitTruncatedArr = truncateHitArr(hitArr, itemArr, hitTruncatedArr)
    item = getHighlightedString(hitTruncatedArr, properties.truncateStart, properties.truncateEnd, properties.divider)
    console.log(item)
  } else {
    // Something I didn't think of, returning the highlighted itemArray
    console.log('### Case - Not sure how you ended up here. Debug!  ###')
  }

  // Get highlighted item as as string
  
}

// ###################################
// # The Functions to make it happen #
// ###################################

// Function: figure out if itemArr needs to be truncated
const caseTruncate = function (itemArrLength, properties, cases) {
  if (itemArrLength > properties.itemMaxWords && properties.itemMaxWords !== 0) {
    return true
  }
}

// Function: Set highlightable query words and count how many
const setHighlightables = function (itemArr, queryArr, cases) {
  itemArr = itemArr.map(function (itemWord, index) {
    const wordObj = {
      word: itemWord
    }
    if (queryArr.find(function (queryWord) { return itemWord === queryWord })) {
      wordObj.highlightable = true
      cases.hitCount = cases.hitCount + 1
    }
    return wordObj
  })
  return itemArr
}

// Function: Joining neighbour highlightable words, removing redundant and setting index value
const joinNeighbourHighlightable = function (itemArr, properties) {
  for (let i = 0; i < itemArr.length; i++) {
    if (i > 0 && itemArr[i].highlightable && itemArr[i - 1].highlightable) {
      // Joining this and previous word
      itemArr[i].word = itemArr[i - 1].word + properties.divider + itemArr[i].word
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
  return itemArr
}

// Function: Add highlighting start and end to highlightable
const addHighlighting = function (itemArr, properties) {
  itemArr = itemArr.map(function (itemWord, index) {
    if (itemWord.highlightable) {
      itemWord.word = properties.highlightStart + itemWord.word + properties.highlightEnd
    }
    return itemWord
  })
  return itemArr
}

// Just set index for padding start and end for each hit
const setPaddingStartEnd = function (hitArr, itemArrLength, properties) {
  for (let i = 0; i < hitArr.length; i++) {
    // do some padding stuff...
    hitArr[i].paddStart = Math.max(hitArr[i].index - properties.hitPaddingMin, 0)
    hitArr[i].paddEnd = Math.min(hitArr[i].index + properties.hitPaddingMin + 1, itemArrLength)
  }
  return hitArr
}

// Check if not to keep all query word hits
const caseKeepAllQueryWords = function (hitArr, properties) {
  if (hitArr.length * (properties.hitPaddingMin * 2) > properties.itemMaxWords) {
    return false
  } else {
    return true
  }
}

// Cut off hit array
const cutOffHitArray = function (hitArr, properties) {
  // per hit
  const totalWords = hitArr.length * ((properties.hitPaddingMin * 2) + 1)
  const wordsPerHit = (properties.hitPaddingMin * 2) + 1
  const wordsToMany = totalWords - properties.itemMaxWords
  //  how many hits to cut off
  const hitsToKeep = hitArr.length - (Math.ceil(wordsToMany / wordsPerHit))
  hitArr = hitArr.slice(0, hitsToKeep)
  return hitArr
}

const joinOverlappingTruncate = function (hitArr) {
  for (let i = 0; i < hitArr.length; i++) {
    if (i > 0 && hitArr[i].paddStart <= hitArr[i - 1].paddEnd) {
      // join this and next
      hitArr[i].paddStart = hitArr[i - 1].paddStart
      // Removing previous padding group from index
      hitArr.splice(i - 1, 1)
      // fixing array count
      i = i - 1
    }
  }
  return hitArr
}

// Generate Truncate groups
const truncateHitArr = function (hitArr, itemArr, hitTruncatedArr) {
  for (let i = 0; i < hitArr.length; i++) {
    hitTruncatedArr[i] = itemArr.slice(hitArr[i].paddStart, hitArr[i].paddEnd)
  }
  return hitTruncatedArr
}

// Create the string with hit highligted, truncated and padded
// Guessing this may need to have it's siblings for not truncated ???
const getHighlightedString = function (hitTruncatedArr, truncateStart, truncateEnd, divider) {
  let hitTruncated = []
  for (let i = 0; i < hitTruncatedArr.length; i++) {
    let singleHitPadded = ''
    for (let j = 0; j < hitTruncatedArr[i].length; j++) {
      singleHitPadded += hitTruncatedArr[i][j].word + divider
    }
    hitTruncated += truncateStart + singleHitPadded + truncateEnd
  }
  return hitTruncated
}

highlight(query, result, properties)
