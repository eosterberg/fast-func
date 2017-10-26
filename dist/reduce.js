export default (arr, fn, acc) => {
  for (var i = 0, l = arr.length; i < l; i++) acc = fn(acc, arr[i])
  return acc
}