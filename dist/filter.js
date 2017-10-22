module.exports = (arr, fn) => {
  for (var i = 0, l = arr.length, out = [], val; i < l; i++) {
    val = arr[i]
    if (fn(val)) out.push(val)
  }
  return out
}