// libraries
const highlight = require('../index.js')
const test = require('tape')

// data
const item = ['some', 'interesting', 'words', 'to', 'remember']

test('default highlighting', function (t) {
  t.plan(1)
  const query = ['interesting', 'words']
  const expectedResult = ['some',
    '<span class="highlighted">interesting</span>',
    '<span class="highlighted">words</span>',
    'to',
    'remember'
  ]
  const actualResult = highlight(query, item)
  t.looseEqual(actualResult, expectedResult)
})

test('no hit so no highlighting', function (t) {
  t.plan(1)
  const query = ['no', 'hits']
  const expectedResult = ['some',
    'interesting',
    'words',
    'to',
    'remember'
  ]
  const actualResult = highlight(query, item)
  t.looseEqual(actualResult, expectedResult)
})

test('markdown highlighting', function (t) {
  t.plan(1)
  const query = ['interesting', 'words']
  const expectedResult = [
    'some',
    '**interesting**',
    '**words**',
    'to',
    'remember'
  ]
  const actualResult = highlight(query, item, { start: '**', end: '**' })
  t.looseEqual(actualResult, expectedResult)
})
