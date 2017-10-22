module.exports = (arr, fn, acc) => {
  for (var l = arr.length, i = 0; i < l; i++)
    acc = fn(acc, arr[i])
  return acc
}
