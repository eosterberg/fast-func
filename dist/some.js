/**
 * Like native `Array.prototype.some` except it
 * runs from right->left and only invokes the iteratee
 * with each item (not index).
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 */
export default (arr, fn) => {
  var i = arr.length
  while (i--) if (fn(arr[i])) return true
  return false
}