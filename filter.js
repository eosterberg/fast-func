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
    console.log('')
  }
  fns.forEach(fn => {
    console.log(fn.name + ' result: ', JSON.stringify(fn(input)))
  })
}

const filter = i => i % 2

const filterFn = input => input.filter(filter)

const forFn = input => {
  let i = input.length
  let output = []
  for (var x = 0;x < i; x++) {
    if (input[x] % 2) output.push(input[x])
  }
  return output
}

const forFnLambda = input => {
  let i = input.length
  let output = []
  for (var x = 0;x < i; x++) {
    let val = input[x]
    if (filter(val)) output.push(val)
  }
  return output
}

const forFnCached = input => {
  let i = input.length
  let output = []
  for (var x = 0;x < i; x++) {
    let val = input[x]
    if (val % 2) output.push(val)
  }
  return output
}

const forFnInsert = input => {
  let i = input.length
  let output = []
  for (var x = 0, y = 0;x < i; x++) {
    let val = input[x]
    if (val % 2) output[y++] = val
  }
  return output
}

const whileFn = input => {
  let i = input.length
  let output = []
  while (i--) {
    if (input[i] % 2) output.push(input[i])
  }
  return output.reverse()
}

const forReverse = input => {
  let i = input.length
  let output = []
  while (i--) {
    if (input[i] % 2) output.unshift(input[i])
  }
  return output
}

testAll([filterFn, forFn, forFnCached, forFnLambda, forFnInsert])
