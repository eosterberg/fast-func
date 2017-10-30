/**
 * Like native `Array.prototype.find` except it
 * only invokes the iteratee with each item (not index).
 * It iterates left->right to keep compatibility with native
 * find and avoid confusion.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {*} The value if found, else undefined.
 */
export default (arr, fn) => {
  for (var i = 0, l = arr.length; i < l; i++) if (fn(arr[i])) return arr[i]
}