var Benchmark = require('benchmark')
const fastFunc = require('./dist/fastFunc')

const test_iterations = 1000
const test_rounds = 1

const sortedList = [1,2,3,4,5,6,7,8,9,10]
longerList = [].concat.apply([], sortedList.map(_ => sortedList))
const inputs = {
  longerList: longerList
}

const lambdas = {
  modulo: (i) => i % 2,
  lessThan: (i) => i < 4
}

// for (let fnName in fastFunc) {
//   for (let inpName in inputs) {
//     for (let lambdaName in lambdas) {
//       testAFunction(fnName, fastFunc[fnName], inputs[inpName], lambdas[lambdaName], lambdaName)
//     }
//   }
// }

const newTest = (name, impl, input, lambda, lambdaName) => {
  var suite = new Benchmark.Suite

  if (input[name]) {
    suite = suite.add(`Native ${name}`, () => {
      var res = input[name](lambda)
    })
  }
  suite.add(`FastFunc ${name}`, () => {
    var res = impl(input, lambda)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  // run async
  .run({ 'async': true })
}

newTest('map', fastFunc.map, inputs.longerList, lambdas.lessThan)
newTest('forEach', fastFunc.forEach, inputs.longerList, lambdas.lessThan)
newTest('filter', fastFunc.filter, inputs.longerList, lambdas.lessThan)
