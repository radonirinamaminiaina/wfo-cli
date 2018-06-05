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
		const initializeGit = arg.findIndex((element) => element === '--git')
		if (findNewCommand !== -1) {
			log(chalk.green('Generate your template ...'))
			const src = path.resolve(path.dirname(require.main.filename) + '/templates')
			const dest = path.resolve('./')
			const filter = (src, dest) => {
				log(`Copy ${src} to ${dest}`)
				if (!src.match(/node_modules/)) return true
			}
			const installModule = () => {
				log(chalk.green('\n\nInstalling your module ...'))
				// install module
				exec('npm install', (err, stdout) => {
					if (err) return console.error(err)
					log(chalk.blue.bold('Module installed.'))
					log(chalk.blue.bold('\n\n Now you can run "npm install" to start'))
					figlet('Thank you!', (err, data) => {
						if (err) return console.err(err)
						log(chalk.green(data))
					})
				})
			}
			// copy our template
			fs.copy(src, dest, {filter: filter}, err => {
				if (err) return console.err(err)
				const date = new Date()
				const now = `on ${date.getFullYear()}-${date.getMonth()}-${date.getDate()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
				log(chalk.blue.bold('Your template is ready.'))
				log(chalk.green(' \n\nInitialize git ...'))
				// initialize git repo
				if (initializeGit !== -1) {
					exec(`git init && git add . && git commit -am "initialized by fo generator ${now}"`, (err, stdout) => {
						if (err) return console.error(err)
						log(chalk.blue.bold('git initialized.'))
						installModule()
					})
				} else {
					installModule()
				}
			})
		} else {
			log('errcom: command not found. \n Use "fo --help"')
		}
	}
}

module.exports = action