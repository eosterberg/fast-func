/**
 * Like native `Array.prototype.reduce`.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @param {*} [accumulator] The initial value.
 * @returns {*} The accumulated value.
 */
export default (arr, fn, acc) => {
  for (var i = 0, l = arr.length; i < l; i++) acc = fn(acc, arr[i])
  return acc
}