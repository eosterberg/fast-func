const testAll = require('./test').testAll
const every = i => i > 5

const everyFn = input => input.every(every)

const whileFn = input => {
  let i = input.length
  while (i--) {
    if (!every(input[i])) return false
  }
  return true
}

testAll([everyFn, whileFn])
