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
export const map = (arr, fn) => {
  var i = arr.length, out = new Array(i)
  while (i--) out[i] = fn(arr[i])
  return out
}

/**
 * Like `.map`, but also invokes the iteratee with index as
 * second argument.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Array} The new mapped array.
 */
export const mapIdx = (arr, fn) => {
  var i = arr.length, out = new Array(i)
  while (i--) out[i] = fn(arr[i], i)
  return out
}

/**
 * Like native `Array.prototype.every` except it
 * runs from right->left and only invokes the iteratee
 * with each item (not index).
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 */
export const every = (arr, fn) => {
  var i = arr.length
  while (i--) if (!fn(arr[i])) return false
  return true
}

/**
 * Like native `Array.prototype.some` except it
 * runs from right->left and only invokes the iteratee
 * with each item (not index).
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 */
export const some = (arr, fn) => {
  var i = arr.length
  while (i--) if (fn(arr[i])) return true
  return false
}

/**
 * Like native `Array.prototype.forEach` except it
 * only invokes the iteratee with each item (not index).
 * It iterates left->right to keep compatibility with native forEach
 * and avoid confusion.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 */
export const forEach = (arr, fn) => {
  for (var i = 0, l = arr.length; i < l; i++) fn(arr[i])
}

/**
 * Like `.forEach`, but also invokes the iteratee with index as
 * second argument.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 */
export const forEachIdx = (arr, fn) => {
  for (var i = 0, l = arr.length; i < l; i++) fn(arr[i], i)
}

/**
 * Like native `Array.prototype.filter` except it
 * only invokes the iteratee with each item (not index).
 * It iterates left->right to keep compatibility with native
 * filter and avoid confusion.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 */
export const filter = (arr, fn) => {
  for (var i = 0, l = arr.length, out = []; i < l; i++) if (fn(arr[i])) out.push(arr[i])
  return out
}

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
export const find = (arr, fn) => {
  for (var i = 0, l = arr.length; i < l; i++) if (fn(arr[i])) return arr[i]
}

/**
 * Like native `Array.prototype.find` except it
 * only invokes the iteratee with each item (not index) and
 * iterates right->left.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {*} The value if found, else undefined.
 */
export const findUniq = (arr, fn) => {
  var i = arr.length
  while (i--) if (fn(arr[i])) return arr[i]
}

/**
 * Like native `Array.prototype.findIndex`.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {*} The value if found, else undefined.
 */
export const findIndex = (arr, fn) => {
  for (var i = 0, l = arr.length; i < l; i++) if (fn(arr[i])) return i
}

/**
 * Like native `Array.prototype.reduce`.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @param {*} [accumulator] The initial value.
 * @returns {*} The accumulated value.
 */
export const reduce = (arr, fn, acc) => {
  for (var i = 0, l = arr.length; i < l; i++) acc = fn(acc, arr[i])
  return acc
}

/**
 * Like native `Array.prototype.reduceRight`.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @param {*} [accumulator] The initial value.
 * @returns {*} The accumulated value.
 */
export const reduceRight = (arr, fn, acc) => {
  var i = arr.length
  while (i--) acc = fn(acc, arr[i])
  return acc
}