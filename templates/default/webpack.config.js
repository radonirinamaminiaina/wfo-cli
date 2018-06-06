module.exports = (env, argv) => {
    const mode = argv.mode === 'production' ? 'prod' : 'dev'
    return require(`./config/webpack.${mode}.js`)
}