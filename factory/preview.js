const functions = require('./spec').functions
const factory = require('./factory')
const loopBasedFunction = factory.loopBasedFunction

let preview = ''

var result = Object
.keys(functions)
.map(name => {
  let spec = {
    ...functions[name],
    exportStatement: `const ${name} =`
  }
  return loopBasedFunction(spec)
})
.join('\n\n')

console.log('======= FastFunc preview: =======\n')
console.log(result)
