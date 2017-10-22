const input = [1,2,3,4,5,6,7,8]
const test_iterations = 1000000
const test_rounds = 3

const test = fn => {
  console.time(fn.name)
  for (var i = 0; i < test_iterations; i++) {
    const result = fn(input)
  }
  console.timeEnd(fn.name)
}

const testAll = fns => {
  for (var i = 0; i < test_rounds; i++) {
    fns.forEach(test)
  }
  fns.forEach(fn => {
    console.log(fn.name + ' result: ', JSON.stringify(fn(input)))
  })
}

const mapper = i => i * 2

const mapFn = input => input.map(mapper)
mapFn.name = 'mapFn'

const whileFn = input => {
  let i = input.length
  let output = []
  while (i--) {
    output[i] = input[i] * 2
  }
  return output
}
whileFn.name = 'whileFn'

const whileWithLen = input => {
  let i = input.length
  let output = new Array(i)
  while (i--) {
    output[i] = input[i] * 2
  }
  return output
}
whileWithLen.name = 'whileWithLen'

const whileWithFn = input => {
  let i = input.length
  let output = new Array(i)
  while (i--) {
    output[i] = mapper(input[i])
  }
  return output
}
whileWithFn.name = 'whileWithFn'
testAll([mapFn, whileFn, whileWithLen, whileWithFn])
