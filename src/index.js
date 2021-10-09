const defaultProperties = {
  itemMaxWords: 0,
  returnItemAlways: true,
  truncateStart: '<span class="truncated">',
  truncateEnd: '</span>',
  hitPaddingMin: 5,
  highlightStart: '<span class="hitHighlight">',
  highlightEnd: '</span>',
  divider: ' '
}

const highlight = function (queryArr, itemArr, properties) {
  properties = {
    ...defaultProperties,
    ...properties
  }

  const cases = {
    hitFound: false,
    hitCount: 0,
    truncate: false,
    keepAllQueryWords: true,
    toLittlePadding: false
  }

  let hitArr = []
  let hitTruncatedArr = []
  let itemHighlighted = ''

  // ######## Add a case for no hits.
  cases.hitFound = itemArr.some(word => queryArr.includes(word))

  if (cases.hitFound) {
    // ### Preparing & preprocessing for hit highlighting ###
    // A: Check if item is to be truncated
    cases.truncate = caseTruncate(itemArr.length, properties)

    // B: Set matched words to highlightable (true) in itemArr
    itemArr = setHighlightables(itemArr, queryArr, cases)

    // C: Joining neighbour highlightable words, removing redundant and setting index value
    //    And add highlight start and end
    itemArr = joinNeighbourHighlightable(itemArr, properties)
    itemArr = addHighlighting(itemArr, properties)

    // D: Defining index on highlightable words and pushing to hitArr
    hitArr = itemArr.filter(itemArr => itemArr.highlightable)

    // E: Check if to keep all query wordsCut off hit array
    cases.keepAllQueryWords = caseKeepAllQueryWords(hitArr, properties)
  }

  // ### The highlighter "switch" ###
  // just return the highlighted itemArray
  if (!cases.hitFound) {
    itemHighlighted = simpleTruncate(itemArr, properties)
    return itemHighlighted

  // just return the highlighted itemArray
  } else if (!cases.truncate) {
    itemHighlighted = getHighlightedString(itemArr, properties.divider)
    return itemHighlighted

  // needs truncating, but keep all query words
  } else if (cases.truncate && cases.keepAllQueryWords) {
    properties.hitPaddingMin = properties.hitPaddingMin + expandPaddingMin(hitArr.length, itemArr.length, properties)
    hitArr = setPaddingStartEnd(hitArr, itemArr.length, properties)
    hitArr = joinOverlappingPadding(hitArr)
    hitTruncatedArr = truncateHitArr(hitArr, itemArr, hitTruncatedArr)
    itemHighlighted = getTruncatedHighlightedString(hitTruncatedArr, properties.truncateStart, properties.truncateEnd, properties.divider)
    return itemHighlighted

  // needs truncadting and have to cut off query wors
  } else if (cases.truncate && !cases.keepAllQueryWords) {
    hitArr = cutOffHitArray(hitArr, properties)
    hitArr = setPaddingStartEnd(hitArr, itemArr.length, properties)
    hitArr = joinOverlappingPadding(hitArr)
    hitTruncatedArr = truncateHitArr(hitArr, itemArr, hitTruncatedArr)
    itemHighlighted = getTruncatedHighlightedString(hitTruncatedArr, properties.truncateStart, properties.truncateEnd, properties.divider)
    return itemHighlighted
  }
}

// ###################################
// # The Functions to make it happen #
// ###################################

// Function: figure out if itemArr needs to be truncated
const caseTruncate = function (itemArrLength, properties, cases) {
  if (itemArrLength > properties.itemMaxWords && properties.itemMaxWords !== 0) {
    return true
  } else {
    return false
  }
}

// Function: just tuncate words, for when there are no hits
const simpleTruncate = function (itemArr, properties) {
  let item = ''
  if (properties.itemMaxWords > 0 && itemArr.length > properties.itemMaxWords) {
    itemArr = itemArr.slice(0, properties.itemMaxWords)
    item = properties.truncateStart + itemArr.join(properties.divider) + properties.truncateEnd
  } else {
    item = itemArr.join(properties.divider)
  }
  return item
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
    // console.log('hitArr before ' + i)
    // console.log(hitArr)
    hitArr[i].paddStart = Math.max(hitArr[i].index - properties.hitPaddingMin, 0)
    hitArr[i].paddEnd = Math.min(hitArr[i].index + properties.hitPaddingMin + 1, itemArrLength)
    // console.log('hitArr after ' + i)
    // console.log(hitArr)
  }
  return hitArr
}

// Check if not to keep all query word hits
const caseKeepAllQueryWords = function (hitArr, properties) {
  if (hitArr.length * ((properties.hitPaddingMin * 2) + 1) > properties.itemMaxWords) {
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

const expandPaddingMin = function (hitLength, itemLength, properties) {
  return Math.floor((properties.itemMaxWords - ((hitLength * (properties.hitPaddingMin * 2)) + 1)) / hitLength / 2)
}

const joinOverlappingPadding = function (hitArr) {
  for (let i = 0; i < hitArr.length; i++) {
    if (i > 0 && hitArr[i].paddStart <= hitArr[i - 1].paddEnd) {
      // join this and previous
      hitArr[i].paddStart = hitArr[i - 1].paddStart
      // console.log('Debugging joinOverlappingPadding')
      // console.log(hitArr[i])
      // console.log('hitArr.paddStart : ' + hitArr[i].paddStart)
      // console.log('hitArr.paddEnd   : ' + hitArr[i].paddEnd)
      // Removing previous padding group from index
      hitArr.splice(i - 1, 1)
      // fixing array count
      i = i - 1
    }
  }
  // console.log(JSON.stringify(hitArr))
  return hitArr
}

// Generate Truncate groups
const truncateHitArr = function (hitArr, itemArr, hitTruncatedArr) {
  for (let i = 0; i < hitArr.length; i++) {
    hitTruncatedArr[i] = itemArr.slice(hitArr[i].paddStart, hitArr[i].paddEnd)
  }
  return hitTruncatedArr
}

// Join words + divider for highlighted full itemArr
const getHighlightedString = function (itemArr, divider) {
  let hitFull = ''
  for (let i = 0; i < itemArr.length; i++) {
    hitFull += itemArr[i].word + divider
  }
  return hitFull
}

// Create the string with hit highligted, truncated and padded
// Guessing this may need to have it's siblings for not truncated ???
const getTruncatedHighlightedString = function (hitTruncatedArr, truncateStart, truncateEnd, divider) {
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

module.exports = highlight
