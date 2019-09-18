// Default hightlight code object
const defaultHighlighting = {
  start: '<span class="highlighted">',
  end: '</span>'
}

exports.highlight = function(query, item, highlighting) {
  // Check input
  // Populate regex and options objects
  highlighting = {
    ...defaultHighlighting,
    ...highlighting
  }
  // Compare all query array values with all item array values
  for (let i = 0; i < query.length; i++) {
    for (let j = 0; j < item.length; j++) {
      if (query[i] === item[j]) {
        item[j] = highlighting.start + item[j] + highlighting.end
      }
    }
  }
}

