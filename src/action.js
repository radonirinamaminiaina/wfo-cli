const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const { exec, spawn } = require('child_process')
const figlet = require('figlet')
const log = console.log
const error = console.error
const { existsSync } = require('fs')

const findIndex = (arg, command) => {arg.findIndex((element) => element === command)}
const action = {
	/**
	 * copy template into the dest folder
	 */
	copy: (arg, name, options) => {
		// find index of arg
		const findIndexNewCommand = findIndex(arg, 'new')
		const finIndexGitFlag = findIndex(arg,'--git-init')
		if (findIndexNewCommand !== -1) {
			log(chalk.green('Generate your template ...'))
			const src = path.resolve(path.dirname(require.main.filename) + '/templates')
			const dest = path.resolve(`./${name || ''}`)
			const filter = (src, dest) => {
				log(`Generate ${dest}`)
				if (!src.match(/(templates\/(.*)?\/)?node_modules/i)) return true
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
				if (options.gitInit) {
					// find for .git folder
					if (!existsSync(path.resolve('./.git'))) {
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
				} else {
					installModule()
				}
			})
		} else {
			throw new Error('errcom: Command not found. Use "fo --help"')
		}
	},
	/**
	 * front serve [-p [--port] <port>, -h [--host] <host>]
	 * @param options
	 */
	serve: (arg, options) => {
		const findIndexServeCommand = findIndex(arg,'serve')
		if (findIndexServeCommand !== -1) {
			// defined env var
			if (options.port) process.env.PORT = options.port
			if (options.host) process.env.HOST = options.host

			const webpackDevServerCommand = path.resolve('./node_modules/.bin/webpack-dev-server')
			const webpackDevServer = /^win/.test(process.platform) ? `${webpackDevServerCommand}.cmd` : webpackDevServerCommand
			// execute webpack-dev-server command
			const start = spawn(webpackDevServer, ['--mode', 'development', '--hot'])

			// add log
			log(chalk.green(`\n\n Front generator is serving at http://${options.host || 'localhost'}:${options.port || 8080}\n\n`))

			start.stdout.on('data', (data) => {
				console.log(data.toString('utf-8'))
			})
			start.stderr.on('data', (data) => {
				console.log(`stderr: ${data.toString('utf-8')}`);
			});
		}
	},
	/**
	 * front build [--absolute]
	 */
	build: (arg, options) => {
		const findIndexBuildCommand = findIndex(arg, 'build')
		if (findIndexBuildCommand !== -1) {
			const webpackCommand = path.resolve('./node_modules/.bin/webpack')
			const webpack = /^win/.test(process.platform) ? `${webpackCommand}.cmd` : webpackCommand
			// set ABS env
			process.env.ABS = options.absolute

			const execWebpackCommand = () => {
				// execute webpack command
				const webpackSpwaned = spawn(webpack, ['--mode', 'production', '--progress'])
				webpackSpwaned.stdout.on('data', (data) => {
					log(data.toString('utf-8'))
				})
				webpackSpwaned.stderr.on('data', (data) => {
					log(`stderr: ${data.toString('utf-8')}`)
				})
			}
			if (existsSync(path.resolve('./src/assets/dist'))) {
				exec('rm -rf src/assets/dist', (err, data) => {
					if (err) return error(err)
					execWebpackCommand()
				})
			} else {
				execWebpackCommand()
			}
		}
	}
}

module.exports = action