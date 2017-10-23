const curriedNativeTestFn = (template) => {
  const {testInput, testLambda, additionalTestArg, compareWith} = template
  return additionalTestArg !== undefined
  ? () => testInput[compareWith](testLambda, additionalTestArg)
  : () => testInput[compareWith](testLambda)
}

const curriedTestFn = (template, fastFunc, name) => {
  const {testInput, testLambda, additionalTestArg} = template
  return additionalTestArg !== undefined
  ? () => fastFunc[name](testInput, testLambda, additionalTestArg)
  : () => fastFunc[name](testInput, testLambda)
}

const curriedTestFnDirectCall = (template, fastFunc, name) => {
  const {testInput, testLambda, additionalTestArg} = template
  const fastFuncFn = fastFunc[name]
  return additionalTestArg !== undefined
  ? () => fastFuncFn(testInput, testLambda, additionalTestArg)
  : () => fastFuncFn(testInput, testLambda)
}

const extendWithTestAndBenchmarkFunctions = (fastFunc, functions) => {
  Object.entries(functions).forEach(entry => {
    const name = entry[0]
    const template = entry[1]
    const fastFuncFn = fastFunc[name]
    const nativeCurried = curriedNativeTestFn(template)
    const curried = curriedTestFn(template, fastFunc, name)
    const curriedDirectCall = curriedTestFnDirectCall(template, fastFunc, name)
    // todo: make more "standard" tests, for now benchmark are the same as normal ones
    template.testFunction = curriedDirectCall
    template.nativeTestFunction = nativeCurried
    template.benchmarks = [
      {label: `Native ${template.compareWith}`, fn: nativeCurried},
      {label: `FastFunc ${name}`, fn: curried},
      {label: `FastFunc ${name}, direct call`, fn: curriedDirectCall},
    ]
  })
  return functions
}

module.exports = {
  extendWithTestAndBenchmarkFunctions
}
