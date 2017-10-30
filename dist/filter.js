/**
 * Like native `Array.prototype.filter` except it
 * only invokes the iteratee with each item (not index).
 * It iterates left->right to keep compatibility with native
 * filter and avoid confusion.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 */
export default (arr, fn) => {
  for (var i = 0, l = arr.length, out = []; i < l; i++) if (fn(arr[i])) out.push(arr[i])
  return out
}