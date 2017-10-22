const spec = require('./spec')
const buildLib = require('./factory').buildLib
const fastFuncLib = buildLib(spec)

console.log('======= FastFunc preview: =======\n')
console.log(fastFuncLib)
