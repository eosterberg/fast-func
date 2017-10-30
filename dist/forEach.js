/**
 * Like native `Array.prototype.forEach` except it
 * only invokes the iteratee with each item (not index).
 * It iterates left->right to keep compatibility with native forEach
 * and avoid confusion.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 */
export default (arr, fn) => {
  for (var i = 0, l = arr.length; i < l; i++) fn(arr[i])
}