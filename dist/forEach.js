module.exports = (arr, fn) => {
  for (var i = 0, l = arr.length; i < l; i++) fn(arr[i])
}