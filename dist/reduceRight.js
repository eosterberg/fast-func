/**
 * Like native `Array.prototype.reduceRight`.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @param {*} [accumulator] The initial value.
 * @returns {*} The accumulated value.
 */
export default (arr, fn, acc) => {
  var i = arr.length
  while (i--) acc = fn(acc, arr[i])
  return acc
}