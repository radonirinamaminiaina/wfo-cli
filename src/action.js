const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const { exec, spawn } = require('child_process')
const figlet = require('figlet')
const log = console.log
const error = console.error

const findIndex = (arg, command) => {arg.findIndex((element) => element === command)}
const action = {
	copy: (arg) => {
		// find index of arg
		const findIndexNewCommand = findIndex(arg, 'new')
		const finIndexGitFlag = findIndex(arg,'--git-init')

		if (findIndexNewCommand !== -1) {
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
					if (err) return error(err)
					log(chalk.blue.bold('Module installed.'))
					log(chalk.blue.bold('\n\n Now you can run "fo serve" or "npm start" to start'))
					figlet('Thank you!', (err, data) => {
						if (err) return error(err)
						log(chalk.green(data))
					})
				})
			}
			// copy our template
			fs.copy(src, dest, {filter: filter}, err => {
				if (err) return error(err)
				const date = new Date()
				const now = `on ${date.getFullYear()}-${date.getMonth()}-${date.getDate()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
				log(chalk.blue.bold('Your template is ready.'))
				if (finIndexGitFlag !== -1) {
					// initialize git repo
					log(chalk.green(' \n\nInitialize git ...'))
					// exec git command
					exec(`git init && git add . && git commit -am "initialized by fo generator ${now}"`, (err, stdout) => {
						if (err) return error(err)
						log(chalk.blue.bold('git initialized.'))
						installModule()
					})
				} else {
					installModule()
				}
			})
		} else {
			throw new Error('errcom: Command not found. Use "fo --help"')
		}
	},
	serve: (arg, options) => {
		const findIndexBuildCommand = findIndex(arg,'serve')
		if (findIndexBuildCommand !== -1) {
			// defined env var
			process.env.PORT = options.port
			process.env.HOST = options.host

			// execute npm command
			const npm = /^win/.test(process.platform) ? `npm.cmd` : `PORT=${port} npm`
			const start = spawn(npm, ['start'])

			// add log
			log(chalk.green(`\n\n Front generator is serving at http://${options.host}:${options.port}`))

			start.stdout.on('data', (data) => {
				console.log(data.toString('utf-8'))
			})
			start.stderr.on('data', (data) => {
				console.log(`stderr: ${data.toString('utf-8')}`);
			});
		}
	}
}

module.exports = action