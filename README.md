# Webpack Front Office (wfo) cli generator
 wfo-cli is a lightweight command line for generating webpack project for HTML + CSS and Javascript.

## Installation
``` bash
    npm install -g wfo-cli
    # Or
    yarn global add wfo-cli
```

## Usage
### Generate
``` bash
  front new [name] [options]
```
**Argument**

 - **name**: name of the directory which you want to generate project. Default: Current directory

**Options**

 -  **--git-init [optional]**: initialize project with git. Use this option if you don't have `.git` yet.
 - **--using &lt;template&gt; (alias *-u*) [optional]**: Generate the project and using css framework. Available template: bootstrap

### Serve
``` bash
  npm start # the application is served on http://localhost:8080
  # Or
  front serve [options] <value>
```

**Options**

 - **--port (alias -p) [optional]**: The port where the application is served. Default: 8080
 - **--host (alias -h) [optional]**: The host where the application is served. Default: localhost

### Build
``` bash
  npm run prod
  # Or
  npm run prod:abs # for absolute public path
  # Or
  front build [option]
```

**Option**   

   - **--absolute (alias -a) [optional]**: Set the [publicPath](https://webpack.js.org/guides/public-path/) into webpack config to absolute path.
   - **--wp-theme &gt;theme_name&lt; (alias -t): Set [publicPath](https://webpack.js.org/guides/public-path/) to wordpress theme path `(wp-content/themes/<theme_name>)`


## Features

 - [Lazy loading](https://webpack.js.org/guides/lazy-loading/) ([Short Tuto](https://github.com/radonirinamaminiaina/wfo-cli/wiki/Lazy-loading-tutorial-using-wfo-cli))
 - SCSS
 - ES2015+
 - Hot Module Replacement
 - Live reload