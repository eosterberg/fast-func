const Benchmark = require('benchmark')
const fastFunc = require('./dist/fastFunc')
const template = require('./src/template')

const testAFunction = (fnName, fnTemplate) => new Promise((resolve, reject) => {
  const suite = new Benchmark.Suite
  const testFn = fnTemplate.testFunction
  const testInput = fnTemplate.testInput

  suite.add(`Native ${fnTemplate.compareWith}`, () => {
    const res = testInput[fnTemplate.compareWith](testFn)
  })
  .add(`FastFunc ${fnName}`, () => {
    const res = fastFunc[fnName](testInput, testFn)
  })
  .on('cycle', event => {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
    console.log('')
    resolve()
  })
  .run({async: true})
})

const functions = template.functions
const testPromise = Object.keys(functions)
.reduce((promise, fnName) => {
  return promise.then(() => {
    return testAFunction(fnName, functions[fnName])
  })
}, Promise.resolve())
.then(() => {
  console.log('All tests completed!')
})
