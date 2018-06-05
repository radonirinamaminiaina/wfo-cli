const fs = require('fs-extra')
const path = require('path')

const action = {
	copyTemplate: (arg) => {
		const findNewCommand = arg.findIndex((element) => element === 'new')
		if (findNewCommand !== -1) {
			console.log('generate your template ...')
			const src = path.resolve(path.dirname(require.main.filename) + '/templates')
			const dest = path.resolve('./')
			console.log(dest)
			const filter = (src, dest) => {
				console.log(src.match(/node_modules/))
				if (!src.match(/node_modules/)) return true
			}

			fs.copy(src, dest, {filter: filter}, err => {
				if (err) return console.err(err)
				console.log('success')
			})
		} else {
			console.log('not found')
		}
	}
}

module.exports = action