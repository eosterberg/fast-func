const Benchmark = require('benchmark')
const fastFunc = require('../dist/fast-func-umd')
const template = require('../src/template')
const extendWithTestAndBenchmarkFunctions = require('../spec/testPreparations').extendWithTestAndBenchmarkFunctions
const saveToHistory = require('./saveToHistory')

const testAFunction = (template, results) => new Promise((resolve, reject) => {
  let result = ''
  let suite = new Benchmark.Suite()
  template.benchmarks.forEach(benchmark => {
    suite = suite.add(benchmark.label, benchmark.fn)
  })
  suite.on('cycle', event => {
    let info = String(event.target)
    console.log(info)
    result += info + '\n'
  })
  .on('complete', function() {
    let info = 'Fastest is ' + this.filter('fastest').map('name').join(', ')
    console.log(info + '\n')
    results.push(result + info)
    resolve(results)
  })
  .run({async: true})
})

const functions = extendWithTestAndBenchmarkFunctions(fastFunc, template.functions)
const testPromise = Object.values(functions)
.filter(template => template.shouldBenchmark)
.reduce((promise, template) => {
  return promise.then(results => {
    return testAFunction(template, results)
  })
}, Promise.resolve([]))
.then(results => {
  console.log('All tests completed!')
  saveToHistory(results)
})
