module.exports = (arr, fn) => {
  for (var l = arr.length, out = [], i = 0, val; i < l; i++) {
    val = arr[i]
    if (fn(val)) out.push(val)
  }
  return out
}
