export default (arr, fn) => {
  for (var i = 0, l = arr.length; i < l; i++) if (fn(arr[i])) return arr[i]
}