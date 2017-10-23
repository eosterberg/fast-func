const template = require('./template')
const buildLib = require('./factory').buildLib
const fastFuncLib = buildLib(template)

console.log('======= FastFunc preview: =======\n')
console.log(fastFuncLib)
