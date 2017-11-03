const fs = require('fs')
const path = require('path')
const util = require('util')
const template = require('./template')
const factory = require('./factory')
const writeFile = util.promisify(fs.writeFile)
const removeFile = util.promisify(fs.unlink)
const readFile = util.promisify(fs.readFile)

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

  let writeFiles = template.libs.map(libName => {
    const libCode = factory.buildLib(libName, template)
    return writeFile(atDistPath(libName + '.js'), libCode)
  })

  // build readme:
  const readmePromise = readFile(path.resolve(__dirname + '/readmeTemplate.md'), 'utf8')
  .then(readme => {
    readme += '\n' + factory.buildDocs(template.libs[0], template) + '\n'
    const readmePath = path.resolve(__dirname + '/../readme.md')
    return removeFile(readmePath).then(() => writeFile(readmePath, readme))
  })
  writeFiles.push(readmePromise)

  Promise.all(writeFiles)
  .then(() => {
    console.log('success!')
  }).catch(e => {
    console.log(e)
  })
}

fs.readdir(distPath, (err, files) => {
  if (err) console.error('No dist dir!')
  else {
    Promise.all(
      files
      .filter(f => f !== '.babelrc')
      .map(atDistPath)
      .map(p => removeFile(p))
    ).then(startBuild)
  }
})
