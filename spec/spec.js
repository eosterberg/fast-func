// https://jasmine.github.io/api/2.8/matchers.html
const fastFunc = require('../dist/fastFunc')
const template = require('../src/template')
const extendWithTestAndBenchmarkFunctions = require('./testPreparations').extendWithTestAndBenchmarkFunctions
const functions = extendWithTestAndBenchmarkFunctions(fastFunc, template.functions)

describe("FastFunc", () => {
  Object.entries(functions).forEach(entry => {
    const [name, template] = entry
    if (template.shouldTest) {
      it(`${name} should produce similar results as native ${template.compareWith}`, () => {
        const res1 = template.testFunction()
        const res2 = template.nativeTestFunction()
        expect(res1).toEqual(res2)
      })
    }
  })
})
