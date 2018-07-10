module.exports = {
  install: {
    start: (options) => `\n\n Front generator is serving at http://${options.host || 'localhost'}:${options.port || 8080}\n\n`,
    progress: '\n\nInstalling your module ...',
    generate: 'Generate',
    generateTpl: 'Generate your template ...',
    complete: 'Module installed.',
    completeInstruct: '\n\n Now you can run "front serve" or "npm start" to start',
    error: 'errcom: Command not found. Use "fo --help"',
    thanx: 'Thank you!',
    ready: 'Your template is ready.',
    git: ' \n\nInitialize git ...',
    gitCommit: (date) => `git init && git add . && git commit -am "initialized by fo generator ${date}"`,
    gitInitialized: 'git initialized.'
  }
}