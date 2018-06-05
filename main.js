#!/usr/bin/env node

const program = require('commander')
const action  = require('./src/action')
const [,,...argv] = process.argv

program
  .version('v1.2.2')
  .description('fo <command> [options]')

program
  .command('new')
  .description('generate new template')
  .option('-u, --using <framework> [optional]', 'Use css framework or not (Coming soon)')
  .option('--git-init [optional]', 'Initialize with git')
  .action(options => {
    action.copy(argv, options)
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