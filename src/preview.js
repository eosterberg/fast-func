const template = require('./template')
const buildLib = require('./factory').buildLib
const MAIN_LIB = template.libs[0]
const fastFuncLib = buildLib(MAIN_LIB, template)
console.log(fastFuncLib)
