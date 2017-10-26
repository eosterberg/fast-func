const fs = require('fs')
const path = require('path')
const util = require('util')
const template = require('./template')
const factory = require('./factory')
const loopBasedFunction = factory.loopBasedFunction
const buildLib = factory.buildLib
const writeFile = util.promisify(fs.writeFile)
const removeFile = util.promisify(fs.unlink)

const distPath = path.resolve(__dirname + '/../dist')
const atDistPath = fileName => path.resolve(distPath + '/' + fileName)

const startBuild = () => {
  // filter out flagged non-builds:
  const functions = Object.entries(template.functions)
  .filter(entries => entries[1].shouldBuild)
  .reduce((res, entry) => {
    res[entry[0]] = entry[1]
    return res
  }, {})
  template.functions = functions

  let writeFiles = Object
  .keys(functions)
  .map(name => {
    const fnSpec = functions[name]
    const code = loopBasedFunction(fnSpec)
    const filePath = atDistPath(name + '.js')
    return writeFile(filePath, code)
  })

  template.libs.forEach(libName => {
    const libCode = buildLib(libName, template)
    writeFiles.push(writeFile(atDistPath(libName + '.js'), libCode))
  })

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
