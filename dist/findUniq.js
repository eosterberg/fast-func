export default (arr, fn) => {
  var i = arr.length
  while (i--) if (fn(arr[i])) return arr[i]
}