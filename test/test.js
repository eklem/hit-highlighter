const hhl = require ('../index.js')


let query = ['interesting', 'words']
let item = ['some', 'interesting', 'words', 'to', 'remember']

hhl.highlight(query,item)

console.log(item)