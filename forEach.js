const testAll = require('./test').testAll
const forEach = i => i + 5

const forEachFn = input => input.forEach(forEach)

const forFn = input => {
  let i = input.length
  for (var x = 0;x < i; x++) {
    forEach(input[x])
  }
}

testAll([forEachFn, executeForFn])
