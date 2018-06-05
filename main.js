#!/usr/bin/env node

const program = require('commander')

program
  .version('0.1.0')
  .option('-r, --relative [optional]', 'Relative path for assets')
  .option('-a, --absolute [optional]', 'Absolute path for assets')
  .parse(process.argv)