const fastFunc = require('../dist/fastFunc')

const test_iterations = 1000
const test_rounds = 1

testAFunction = (name, impl, input, lambda, lambdaName) => {
  let  x = 0, y = 0
  console.log(`===== Testing '${name}' with ${lambdaName} =====`)

  while (x++ < test_rounds) {
    if (input[name]) {
      console.time('native')
      while (y++ < test_iterations) {
        var result = input[name](lambda)
      }
      console.timeEnd('native')
    }
    console.time('fastFunc')
    while (y++ < test_iterations) {
      var result = impl(input, lambda)
    }
    console.timeEnd('fastFunc')
  }
  if (input[name]) {
    console.log('native return value:',JSON.stringify(input[name](lambda)))
  }
  console.log('fastFunc return value:', JSON.stringify(impl(input, lambda)))
}

const sortedList = [1,2,3,4,5,6,7,8,9,10]
longerList = [].concat.apply([], sortedList.map(_ => sortedList))
const inputs = {
  longerList: longerList
}

const lambdas = {
  modulo: (i) => i % 2,
  lessThan: (i) => i < 4
}

for (let fnName in fastFunc) {
  for (let inpName in inputs) {
    for (let lambdaName in lambdas) {
      testAFunction(fnName, fastFunc[fnName], inputs[inpName], lambdas[lambdaName], lambdaName)
    }
  }
}
