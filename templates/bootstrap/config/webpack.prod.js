const common = require('./webpack.common')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const sassCompiler = require('./sass-compiler')
const merge = require('webpack-merge')

const prod = merge(common, {
  module: {
    rules: [
      sassCompiler(MiniCssExtractPlugin, false, false, true)
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
      chunkFilename: "[id].css"
    })
  ]
})

module.exports = prod;