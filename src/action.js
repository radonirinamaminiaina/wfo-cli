const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const { exec } = require('child_process')
const figlet = require('figlet')
const log = console.log

const action = {
	copyTemplate: (arg) => {
		const findNewCommand = arg.findIndex((element) => element === 'new')
		if (findNewCommand !== -1) {
			log(chalk.green('Generate your template ...'))
			const src = path.resolve(path.dirname(require.main.filename) + '/templates')
			const dest = path.resolve('./generated')
			const filter = (src, dest) => {
				log(`Copy ${src} to ${dest}`)
				if (!src.match(/node_modules/)) return true
			}

			fs.copy(src, dest, {filter: filter}, err => {
				if (err) return console.err(err)
				log(chalk.blue.bold('Your template is ready. \n\n'))
				log(chalk.green('Initialize git ...'))
				exec('git init && git add . && git commit -am "initialized by fo generator"', (err, stdout) => {
					if (err) return console.error(err)
					log(chalk.blue.bold('git initialized.'))
					log(chalk.green('Installing your module ...'))
					exec('npm install', (err, stdout) => {
						if (err) return console.error(err)
						log(chalk.blue.bold('Module installed.'))
						log(chalk.blue.bold('\n Now you can run "npm install" to start'))
						figlet('Thank you', (err, data) => {
							if (err) return console.err(err)
							log(chalk.green(data))
						})
					})
				})
			})
		} else {
			log('not found')
		}
	}
}

module.exports = action