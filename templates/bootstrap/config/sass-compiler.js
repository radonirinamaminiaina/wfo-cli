module.exports = (extractCss, devMode, sourceMap, minimize) => {
  const sassLoaderObject = {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      outputStyle: 'expanded',
      sourceComments: 'map'
    }
  }
  return {
    test: /\.scss$/,
    use: [
        'css-hot-loader',
        extractCss.loader,
        {
          loader: 'css-loader',
          options: { importLoaders: 1, url: false, sourceMap: sourceMap, minimize: minimize}
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: (loader) => [
                    require('autoprefixer')({
                      browsers: [
                        "> 0.3%",
                        "last 7 versions",
                        "Android >= 4", 
                        "Firefox >= 20", 
                        "iOS >= 8"
                      ]
                    })
                ]
            }
        },
        devMode ? sassLoaderObject : 'sass-loader'
    ]
  }
}