const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const { exec } = require('child_process')
const figlet = require('figlet')
const log = console.log

const action = {
	copyTemplate: (arg) => {
		// find index of arg
		const findNewCommand = arg.findIndex((element) => element === 'new')
		if (findNewCommand !== -1) {
			log(chalk.green('Generate your template ...'))
			const src = path.resolve(path.dirname(require.main.filename) + '/templates')
			const dest = path.resolve('./')
			const filter = (src, dest) => {
				log(`Copy ${src} to ${dest}`)
				if (!src.match(/node_modules/)) return true
			}
			// copy our template
			fs.copy(src, dest, {filter: filter}, err => {
				if (err) return console.err(err)
				log(chalk.blue.bold('Your template is ready. \n\n'))
				log(chalk.green('Initialize git ...'))
				// initialize git repo
				exec('git init && git add . && git commit -am "initialized by fo generator"', (err, stdout) => {
					if (err) return console.error(err)
					log(chalk.blue.bold('git initialized.'))
					log(chalk.green('Installing your module ...'))
					// install module
					exec('npm install', (err, stdout) => {
						if (err) return console.error(err)
						log(chalk.blue.bold('Module installed.'))
						log(chalk.blue.bold('\n Now you can run "npm install" to start'))
						figlet('Thank you!', (err, data) => {
							if (err) return console.err(err)
							log(chalk.green(data))
						})
					})
				})
			})
		} else {
			log('errcom: command not found. \n Use "fo --help"')
		}
	}
}

module.exports = action