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

module.exports = {
  test,
  testAll
}
