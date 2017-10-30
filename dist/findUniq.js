/**
 * Like native `Array.prototype.find` except it
 * only invokes the iteratee with each item (not index) and
 * iterates right->left.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {*} The value if found, else undefined.
 */
export default (arr, fn) => {
  var i = arr.length
  while (i--) if (fn(arr[i])) return arr[i]
}