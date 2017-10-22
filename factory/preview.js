const arraySpec = require('./arraySpec')
const factory = require('./factory')
const loopBasedFunction = factory.loopBasedFunction

let preview = ''

var result = Object
.keys(arraySpec)
.map(name => loopBasedFunction(name, arraySpec[name]))
.join('\n')

console.log('======= FastFunc preview: =======\n')
console.log(result)
