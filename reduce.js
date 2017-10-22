const testAll = require('./test').testAll
const reducer = (a, b) => a + b

const reduceFn = input => input.reduce(reducer, 0)
reduceFn.name = 'reduceFn'

const forFn = input => {
  for (var i = input.length, x = 0, value = 0;x < i; x++) {
    value = reducer(value, input[x])
  }
  return value
}

testAll([reduceFn, forFn])
