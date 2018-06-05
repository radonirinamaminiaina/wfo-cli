const fs = require('fs-extra')
const path = require('path')

const action = {
	copyTemplate: (arg) => {
		const findNewCommand = arg.findIndex((element) => element === 'new')
		if (findNewCommand !== -1) {
			console.log('generate your template ...')
			const src = path.resolve(path.dirname(require.main.filename))
			const dest = path.resolve('./')
			console.log(src, dest)
		} else {
			console.log('not found')
		}
	}
}

module.exports = action