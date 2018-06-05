#!/usr/bin/env node

const program = require('commander')
const action  = require('./src/action')
const [,,...argv] = process.argv

program
  .version('v0.2.0')
  .description('fo <command> [options]')

program
  .command('new')
  .description('generate new template')
  .option('-u, --using <framework> [optional]', 'Use css framework or not (Coming soon)')
  .option('--git-init [optional]', 'Initialize with git')
  .action(()=> {
    action.copy(argv)
  })
program
  .command('serve')
  .description('Serve the application')
  .option('-p, --port <port> [optional]', 'The port where the application is served. Default: 8080')
  .option('-h, --host <host> [optional]', 'The host where the application is served. Default: localhost')
  .action((options)=> {
    action.serve(argv, options)
  })

program.parse(process.argv)