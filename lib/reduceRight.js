module.exports = (arr, fn, acc) => {
  var i = arr.length
  while (i--) acc = fn(acc, arr[i])
  return acc
}
