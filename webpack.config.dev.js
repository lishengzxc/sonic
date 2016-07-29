let path = require('path')
let config = require('./webpack.config.base');

config.entry = {
  'Sonic': './src/index.js'
}

config.output = {
  path: path.join(__dirname, 'dev'),
  filename: 'sonic.js',
  libraryTarget: 'umd',
  library: 'Sonic'
}

config.devtool = '#eval-source-map'

module.exports = config
