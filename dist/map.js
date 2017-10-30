/**
 * Like native `Array.prototype.map` except it
 * runs from right->left and only invokes the iteratee
 * with each item (not index). Use `mapIdx` if index is
 * needed as a second argument.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Array} The new mapped array.
 */
export default (arr, fn) => {
  var i = arr.length, out = new Array(i)
  while (i--) out[i] = fn(arr[i])
  return out
}