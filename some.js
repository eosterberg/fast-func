const testAll = require('./test').testAll
const some = i => i > 5

const someFn = input => input.some(some)

const whileFn = input => {
  let i = input.length
  while (i--) {
    if (some(input[i])) return true
  }
  return false
}

testAll([someFn, whileFn])
