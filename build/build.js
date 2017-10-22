const fs = require('fs')
const path = require('path')
const util = require('util')
const spec = require('./spec')
const factory = require('./factory')
const loopBasedFunction = factory.loopBasedFunction
const buildLib = factory.buildLib
const writeFile = util.promisify(fs.writeFile)
const removeFile = util.promisify(fs.unlink)

const distPath = path.resolve(__dirname + '/../dist')
const atDistPath = fileName => path.resolve(distPath + '/' + fileName)

const startBuild = () => {
  let writeFiles = Object
  .keys(spec.functions)
  .map(name => {
    const fnSpec = spec.functions[name]
    const code = loopBasedFunction(fnSpec)
    const filePath = atDistPath(name + '.js')
    return writeFile(filePath, code)
  })

  const fastFuncLib = buildLib(spec)
  writeFiles.push(writeFile(atDistPath('fastFunc.js'), fastFuncLib))

  Promise.all(writeFiles)
  .then(() => {
    console.log('success!')
  }).catch(e => {
    console.log(e)
  })
}

if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath)
  startBuild()
} else {
  fs.readdir(distPath, (err, files) => {
    if (err) console.error('No dist dir!')
    else {
      Promise.all(
        files
        .map(atDistPath)
        .map(p => removeFile(p))
      ).then(startBuild)
    }
  })
}