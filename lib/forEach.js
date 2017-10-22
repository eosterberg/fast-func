module.exports = (arr, fn) => {
  for (var l = arr.length, i = 0; i < l; i++)
    fn(arr[i])
}
