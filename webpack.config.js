const path = require('path')
const pkg = require('./package.json')
const glob = require('glob')

module.exports = [
  // Generating browser version of hit-highlighter
  {
    mode: 'production',
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'hit-highlighter.' + pkg.version + '.js',
      library: 'highlight'
    },
    devtool: 'none' // prevent webpack from using eval() on my module
  },

  // Generating a latest browser version of hit-highlighter (same as latest version number)
  {
    mode: 'production',
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'hit-highlighter.latest.js',
      library: 'highlight'
    },
    devtool: 'none' // prevent webpack from using eval() on my module
  },

  // Generating test script for the browser
  {
    mode: 'production',
    entry: glob.sync('./test/test.js'),
    output: {
      path: path.resolve(__dirname, './test/sandbox'),
      filename: 'bundle.js'
    },
    node: {
      fs: 'empty'
    }
  }
]
