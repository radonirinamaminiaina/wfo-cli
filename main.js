#!/usr/bin/env node

const program = require('commander')
const action  = require('./src/action')
const [,,...argv] = process.argv

if (!argv.length) {
  console.error('ernoarg: Please provide argument.\nE.g: front new [directory] [--git-init]')
}

program
  .version('v1.5.2')
  .description('front <command> [options]')

program
  .command('new')
  .description('generate new template')
  .arguments('[name]')
  .option('-u, --using <framework> [optional]', 'Use css framework or not (Coming soon)')
  .option('--git-init [optional]', 'Initialize with git')
  .action((name, options) => {
    action.copy(argv, name, options)
  })
program
  .command('serve')
  .description('Serve the application')
  .option('-p, --port <port> [optional]', 'The port where the application is served. Default: 8080')
  .option('-h, --host <host> [optional]', 'The host where the application is served. Default: localhost')
  .action(options => {
    action.serve(argv, options)
  })
program
  .command('build')
  .description('Build the application to prod version')
  .option('-a, --absolute [optional]', 'Absolute path to assets')
  .action(options => {
    action.build(argv, options)
  })

program.parse(process.argv)