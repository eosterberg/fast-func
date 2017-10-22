// https://jasmine.github.io/api/2.8/matchers.html

describe("FastFunc", () => {
  var fastFunc = require('../dist/fastFunc')
  var numList = [1,2,3,4,5,6,7,8,9]
  var square = (num) => num * num
  var gt5 = (num) => num > 5

  it("should map correctly", () => {
    var nMap = numList.map(square)
    var fMap = fastFunc.map(numList, square)
    expect(nMap).toEqual(fMap)
  })

  it("should filter correctly", () => {
    var nFilter = numList.filter(gt5)
    var fFilter = fastFunc.filter(numList, gt5)
    expect(nFilter).toEqual(fFilter)
  })

  it("should some correctly", () => {
    var nSome = numList.some(gt5)
    var fSome = fastFunc.some(numList, gt5)
    expect(nSome).toEqual(fSome)
  })

  it("should every correctly", () => {
    var nEvery = numList.every(gt5)
    var fEvery = fastFunc.every(numList, gt5)
    expect(nEvery).toEqual(fEvery)
  })

  it("should reduce correctly", () => {
    var reducer = (a, b) => a + b
    var nReduce = numList.reduce(reducer, 0)
    var fReduce = fastFunc.reduce(numList, reducer, 0)
    expect(nReduce).toEqual(fReduce)
  })
})
