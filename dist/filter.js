export default (arr, fn) => {
  for (var i = 0, l = arr.length, out = []; i < l; i++) if (fn(arr[i])) out.push(arr[i])
  return out
}