# Front-cli
Front-cli is a lightweight command line for generating webpack project for HTML + CSS and Javascript.

## Installation
``` bash
    npm install -g front-cli
```

## Usage
### Generate
``` bash
    front new [options]
```

**Options**

 -  **--git-init [optional]**: initialize project with git. Use this option if you don't have `.git` yet.
 - **--using (alias *-u*) [optional]**: Generate the project and using css framework. E.g: bootstrap (Coming soon)

### Serve
``` bash
    front serve [options] <value>
```

**Options**

 - **--port (alias -p) [optional]**: The port where the application is served. Default: 8080
 - **--host (alias -h) [optional]**: The host where the application is served. Default: localhost

### Build
``` bash
    front build [option]
```

**Option**   

   - **--absolute (alias -a) [optional]**: Set the [publicPath](https://webpack.js.org/guides/public-path/) into webpack config to absolute path.
