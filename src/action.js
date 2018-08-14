const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const { exec, spawn } = require('child_process')
const figlet = require('figlet')
const log = console.log
const error = console.error
const { existsSync } = require('fs')
const config = require('./config')
const jsonFormat = require('json-format')

const findIndex = (arg, command) => { arg.findIndex((element) => element === command) }
const action = {
	copyTemplate: (_, options) => {
		const template = options.using ? options.using : 'default'
		const srcTpl = path.resolve(path.dirname(require.main.filename) + '/templates/' + template)
		const srcConfig = path.resolve(path.dirname(require.main.filename) + '/src/webpack/')
		const srcMainConfig = path.resolve(path.dirname(require.main.filename) + '/src/common/')
		const dest = path.resolve('./')
		const destConfig = path.resolve('./config')
		const bootstrapVariable = path.resolve('./node_modules/bootstrap/scss')
		const destBootstrapVariable = path.resolve('./src/resources/lib/bootstrap')
		const filter = (_, dest) => {
			log(`${chalk.blue.bold(config.install.generate)} ${dest}`)
			return true
		}
		const createBootstrapVariable = () => {
			fs.copy(bootstrapVariable, destBootstrapVariable, {filter: _ => {
				return /_variables\.scss/g.test(_)
			}}).then(() => {
				figlet(config.install.thanx, (err, data) => {
					if (err) return error(err)
					log(chalk.green(data))
				})
			}).catch(e => console.log(e))
		}
		const installModule = () => {
			log(chalk.green(config.install.progress))
			// install module
			exec('npm install', (err) => {
				if (err) return error(err)
				log(chalk.blue.bold(config.install.complete))
				log(chalk.blue.bold(config.install.completeInstruct))
				setTimeout(createBootstrapVariable, 1000)
			})
		}

		let gitInit = function () {
			const date = new Date()
			const now = `on ${date.getFullYear()}-${date.getMonth()}-${date.getDate()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
			if (options.gitInit) {
				// find for .git folder
				if (!existsSync(path.resolve('./.git'))) {
					// initialize git repo
					log(chalk.green(config.install.git))
					// exec git command
					exec(config.install.gitCommit(now), (err) => {
						if (err) return error(err)
						log(chalk.blue.bold(config.install.gitInitialized))
						installModule()
					})
				} else {
					installModule()
				}
			} else {
				installModule()
			}
		}

		// acton after copy
		const afterCopy = () => {
			log(chalk.blue.bold(config.install.ready))
			fs.readJson(path.resolve('./package.json')).then(function (main_package) {
				if (options.using && options.using !== 'default') {	
					fs.readJson(path.resolve(path.dirname(require.main.filename) + '/src/dependencies/' + options.using + '.json')).then(package => {
						main_package.dependencies = package.dependencies
						fs.writeFile(path.resolve('./package.json'), jsonFormat(main_package)).then(gitInit)
					})
				} else {
					gitInit()
				}
			})
		}

		// copy main tpl
		const copySrcTpl = (clb) => {
			fs.copy(srcTpl, dest, { filter: filter })
				.then(clb)
				.catch(err => {
					return err(err)
				})
		}

		// copy mainConfig (package.json, rc file)
		const copySrcMainConfig = (clb) => {
			fs.copy(srcMainConfig, dest, {filter: () => true})
				.then(clb)
				.catch(err => {
					return err(err)
				})
		}

		// copy webpack config
		const copySrcConfig = (clb) => {
			fs.copy(srcConfig, destConfig)
				.then(clb)
				.catch(err => {
					return err(err)
				})
		}

		copySrcTpl(() => {
			copySrcMainConfig(() => {
				const dataToBeIgnored = ['node_modules', 'package-lock.json']
				fs.writeFile(path.resolve('./.gitignore'), dataToBeIgnored.join('\n'))
				copySrcConfig(afterCopy)
			})
		})
	},
	/**
	 * copy template into the dest folder
	 */
	copy: (arg, name, options) => {
		// find index of arg
		const findIndexNewCommand = findIndex(arg, 'new')
		if (findIndexNewCommand !== -1) {
			log(chalk.green(config.install.generateTpl))
			if (!name) {
				action.copyTemplate(name, options)
			} else {
				fs.ensureDir(name, () => {
					process.chdir(name)
					action.copyTemplate(name, options)
				})
			}
		} else {
			throw new Error(config.install.error)
		}
	},
	/**
	 * front serve [-p [--port] <port>, -h [--host] <host>]
	 * @param options
	 */
	serve: (arg, options) => {
		const findIndexServeCommand = findIndex(arg, 'serve')
		if (findIndexServeCommand !== -1) {
			// defined env variables
			if (options.port) process.env.PORT = options.port
			if (options.host) process.env.HOST = options.host

			const webpackDevServerCommand = path.resolve('./node_modules/.bin/webpack-dev-server')
			const webpackDevServer = /^win/.test(process.platform) ? `${webpackDevServerCommand}.cmd` : webpackDevServerCommand
			// execute webpack-dev-server command
			const start = spawn(webpackDevServer, ['--mode', 'development', '--hot'])

			// add log
			log(chalk.green(config.install.start(options)))

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

			if (options.absolute && options.wpTheme) {
				console.error('Cannot use both --absolute and --wp-theme');
			}

			if (options.absolute) {
				process.env.MODE_ABS = options.absolute
			}

			if (options.wpTheme) {
				process.env.MODE_WP = options.wpTheme
			}

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