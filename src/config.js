module.exports = {
  install: {
    start: (options) => `\n\n Front generator is serving at http://${options.host || 'localhost'}:${options.port || 8080}\n\n`,
    progress: '\n\nInstalling your module ...',
    generate: 'Generate',
    generateTpl: `
    \n
    +----------------------------+
    | Generate your template ... |
    +----------------------------+
    `,
    complete: `
    \n
    +-------------------+
    | Module installed. |
    +-------------------+
    `,
    completeInstruct: '\n\n Now you can run "front serve" or "npm start" to start',
    error: 'errcom: Command not found. Use "fo --help"',
    thanx: 'Thank you!',
    ready: `
    \n
    +-------------------------+
    | Your template is ready. |
    +-------------------------+`,
    git: `\n
    Initializing empty git repo ...`,
    gitCommit: (date) => `git init && git add . && git commit -am "initialized by fo generator ${date}"`,
    gitInitialized: `
    \n
    +-----------------+
    | git initialized. |
    +-----------------+
    `
  }
}