const common = require('./webpack.common')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const sassCompiler = require('./sass-compiler')
const merge = require('webpack-merge')

const dev = merge(common, {
    module: {
      rules: [
        sassCompiler(MiniCssExtractPlugin, true, true, false)
      ]
    },
    devtool: 'cheap-eval-source-map',
    devServer: {
      overlay: true,
      publicPath: '/assets/dist',
      contentBase: './src',
      watchContentBase: true,
      host: process.env.HOST || 'localhost',
      port: process.env.PORT ? process.env.PORT : 8080,
      compress: true
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].bundle.css",
        chunkFilename: "[id].css"
      })
    ]
  }
)

module.exports = dev;