const path = require('path')
const webpack = require('webpack')


const publicPath = `${process.env.MODE_WP ? ("/wp-content/themes/" + process.env.MODE_WP).replace(/\s$/, '') : (process.env.MODE_ABS ? "" : ".")}/assets/dist/`

const common = {
  entry: {
    app: ['babel-polyfill', './src/assets/js/app.js']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('src/assets/dist'),
    publicPath: publicPath
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