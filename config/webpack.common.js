const path = require('path')
const webpack = require('webpack')

const common = {
  entry: {
    app: ['babel-polyfill', './src/assets/js/app.js']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('src/assets/dist'),
    publicPath: `${process.env.MODE_ABS ? "" : "."}/assets/dist/`
  },
  resolve: {
      alias: {
          '@scss': path.resolve('src/resources')
      }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  externals: {
    jquery: 'jQuery'
  }
}

module.exports = common;