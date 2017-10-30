/**
 * Like native `Array.prototype.findIndex`.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {*} The value if found, else undefined.
 */
export default (arr, fn) => {
  for (var i = 0, l = arr.length; i < l; i++) if (fn(arr[i])) return i
}