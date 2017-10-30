/**
 * Like `.map`, but also invokes the iteratee with index as
 * second argument.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Array} The new mapped array.
 */
export default (arr, fn) => {
  var i = arr.length, out = new Array(i)
  while (i--) out[i] = fn(arr[i], i)
  return out
}