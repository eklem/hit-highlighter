// Default hightlight code object
const defaultHighlighting = {
  start: '<span class="highlighted">',
  end: '</span>'
}

const highlight = function (query, item, highlighting) {
  const itemHighlighted = [...item]
  // Check input
  // Populate regex and options objects
  highlighting = {
    ...defaultHighlighting,
    ...highlighting
  }
  // Compare all query array values with all item array values
  for (let i = 0; i < query.length; i++) {
    for (let j = 0; j < itemHighlighted.length; j++) {
      if (query[i] === itemHighlighted[j]) {
        itemHighlighted[j] = highlighting.start + itemHighlighted[j] + highlighting.end
      }
    }
  }
  return itemHighlighted
}

module.exports = highlight
