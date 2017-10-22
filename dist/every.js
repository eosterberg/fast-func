module.exports = (arr, fn) => {
  var i = arr.length
  while (i--) if (!fn(arr[i])) return false
  return true
}