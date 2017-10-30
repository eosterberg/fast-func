/**
 * Like `.forEach`, but also invokes the iteratee with index as
 * second argument.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 */
export default (arr, fn) => {
  for (var i = 0, l = arr.length; i < l; i++) fn(arr[i], i)
}