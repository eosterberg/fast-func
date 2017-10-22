// https://jasmine.github.io/api/2.8/matchers.html

describe("FastFunc", () => {
  var fastFunc = require('../dist/fastFunc')
  var numList = [1,2,3,4,5,6,7,8,9]
  var square = (num) => num * num

  it("should map correctly", () => {
    var nMap = numList.map(square)
    var fMap = fastFunc.map(numList, square)
    expect(nMap).toEqual(fMap)
  })
})
