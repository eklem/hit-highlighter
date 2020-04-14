// Populating div with only meaningful words
const populateItem = function (result) {
  console.log('Boom')
  console.log(result)
  const node = document.createElement('p')
  node.innerHTML = result
  emptyElement('itemWithHighlights')
  document.getElementById('itemWithHighlights').appendChild(node)
}

// Listen to key up on itemtext and initiate a headline parser
document.addEventListener('DOMContentLoaded', function (event) {
  hitHighlight()
})

// Listen to key up on querytext and initiate a headline parser
document.getElementById('querytext').onkeyup = function () {
  hitHighlight()
}

// calculate item highlighted
const hitHighlight = function () {
  var querytext = document.getElementById('querytext').value.split(' ')
  var itemtext = 'some text that resembles a search result item with lots of nice words to match at least some of the query input'.split(' ')
  console.log(querytext)
  console.log(itemtext)
  var hitHighlighted = window.highlight(querytext, itemtext)
  console.log('Hit(s) highlighted: ' + hitHighlighted)
  populateItem(hitHighlighted)
}

// Empty HTML element
const emptyElement = function (element) {
  document.getElementById(element).innerHTML = ''
}
