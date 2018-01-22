const ExtractTextPlugin = require('extract-text-webpack-plugin')

let loaders = {}
if (process.env.NODE_ENV === 'production') {
  loaders = {
    css: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: 'css-loader' }),
    less: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: 'css-loader!less-loader' })
  }
} else {
  loaders = {
    css: 'vue-style-loader!css-loader',
    less: 'vue-style-loader!css-loader!less-loader'
  }
}
module.exports = {
  loaders
}
