#!/usr/bin/env node

const program = require('commander')
const action  = require('./src/action')
const [,,...argv] = process.argv

program
  .version('v0.2.0')
  .option('-u, --using [optional]', 'Use css framework or not')
  .option('-r, --relative [optional]', 'Relative path for assets')
  .option('-a, --absolute [optional]', 'Absolute path for assets')
  .option('--git [optional]', 'Initialize with git')

program
  .command('new')
  .description('generate new template')
  .arguments('test')
  .action(()=> {
    action.copyTemplate(argv)
  })

program.parse(process.argv)