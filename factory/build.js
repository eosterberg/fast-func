const fs = require('fs')
const path = require('path')
const util = require('util')
const arraySpec = require('./arraySpec')
const factory = require('./factory')
const loopBasedFunction = factory.loopBasedFunction
const writeFile = util.promisify(fs.writeFile)
const removeFile = util.promisify(fs.unlink)

const distPath = path.resolve(__dirname + '/../dist')
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath)
  startBuild()
} else {
  fs.readdir(distPath, (err, files) => {
    if (err) console.error('No dist dir!')
    else {
      Promise.all(
        files
        .map(f => path.resolve(__dirname + '/../dist/' + f))
        .map(p => removeFile(p))
      ).then(startBuild)
    }
  })
}

const startBuild = () => {
  var writeFiles = Object
  .keys(arraySpec)
  .map(name => {
    const code = loopBasedFunction(arraySpec[name])
    const fileName = path.resolve(__dirname + '/../dist/' + name + '.js')
    return writeFile(fileName, code)
  })

  Promise.all(writeFiles)
  .then(() => {
    console.log('success!')
  }).catch(e => {
    console.log(e)
  })
}
