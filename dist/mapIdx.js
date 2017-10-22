module.exports = (arr, fn) => {
  var i = arr.length, out = new Array(i)
  while (i--) out[i] = fn(arr[i], i)
  return out
}