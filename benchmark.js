const Benchmark = require('benchmark')
const fastFunc = require('./dist/fastFunc')
const template = require('./src/template')
const extendWithTestAndBenchmarkFunctions = require('./spec/testPreparations').extendWithTestAndBenchmarkFunctions

const testAFunction = (template) => new Promise((resolve, reject) => {
  let suite = new Benchmark.Suite()
  template.benchmarks.forEach(benchmark => {
    suite = suite.add(benchmark.label, benchmark.fn)
  })
  suite.on('cycle', event => {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
    console.log('')
    resolve()
  })
  .run({async: true})
})

const functions = extendWithTestAndBenchmarkFunctions(fastFunc, template.functions)
const testPromise = Object.values(functions)
.reduce((promise, template) => {
  return promise.then(() => {
    return testAFunction(template)
  })
}, Promise.resolve())
.then(() => {
  console.log('All tests completed!')
})
