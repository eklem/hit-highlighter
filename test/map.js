const item = ['some', 'interesting', 'words', 'to', 'remember']
const query = ['interesting', 'words']

item.some(function (itemWord) {
  // console.log(itemWord)
  if (query.some(function (queryWord) {
    return itemWord === queryWord
  })) {
    console.log(itemWord)
  }
})
