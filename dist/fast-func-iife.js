var FastFunc = (function (exports) {
'use strict';

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
var map = function map(arr, fn) {
  var i = arr.length,
      out = new Array(i);
  while (i--) {
    out[i] = fn(arr[i]);
  }return out;
};

/**
 * Like `.map`, but also invokes the iteratee with index as
 * second argument.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Array} The new mapped array.
 */
var mapIdx = function mapIdx(arr, fn) {
  var i = arr.length,
      out = new Array(i);
  while (i--) {
    out[i] = fn(arr[i], i);
  }return out;
};

/**
 * Like native `Array.prototype.every` except it
 * runs from right->left and only invokes the iteratee
 * with each item (not index).
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 */
var every = function every(arr, fn) {
  var i = arr.length;
  while (i--) {
    if (!fn(arr[i])) return false;
  }return true;
};

/**
 * Like native `Array.prototype.some` except it
 * runs from right->left and only invokes the iteratee
 * with each item (not index).
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 */
var some = function some(arr, fn) {
  var i = arr.length;
  while (i--) {
    if (fn(arr[i])) return true;
  }return false;
};

/**
 * Like native `Array.prototype.forEach` except it
 * only invokes the iteratee with each item (not index).
 * It iterates left->right to keep compatibility with native forEach
 * and avoid confusion.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 */
var forEach = function forEach(arr, fn) {
  for (var i = 0, l = arr.length; i < l; i++) {
    fn(arr[i]);
  }
};

/**
 * Like `.forEach`, but also invokes the iteratee with index as
 * second argument.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 */
var forEachIdx = function forEachIdx(arr, fn) {
  for (var i = 0, l = arr.length; i < l; i++) {
    fn(arr[i], i);
  }
};

/**
 * Like native `Array.prototype.filter` except it
 * only invokes the iteratee with each item (not index).
 * It iterates left->right to keep compatibility with native
 * filter and avoid confusion.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 */
var filter = function filter(arr, fn) {
  for (var i = 0, l = arr.length, out = []; i < l; i++) {
    if (fn(arr[i])) out.push(arr[i]);
  }return out;
};

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
var find = function find(arr, fn) {
  for (var i = 0, l = arr.length; i < l; i++) {
    if (fn(arr[i])) return arr[i];
  }
};

/**
 * Like native `Array.prototype.find` except it
 * only invokes the iteratee with each item (not index) and
 * iterates right->left.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {*} The value if found, else undefined.
 */
var findUniq = function findUniq(arr, fn) {
  var i = arr.length;
  while (i--) {
    if (fn(arr[i])) return arr[i];
  }
};

/**
 * Like native `Array.prototype.findIndex`.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {*} The value if found, else undefined.
 */
var findIndex = function findIndex(arr, fn) {
  for (var i = 0, l = arr.length; i < l; i++) {
    if (fn(arr[i])) return i;
  }
};

/**
 * Like native `Array.prototype.reduce`.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @param {*} [accumulator] The initial value.
 * @returns {*} The accumulated value.
 */
var reduce = function reduce(arr, fn, acc) {
  for (var i = 0, l = arr.length; i < l; i++) {
    acc = fn(acc, arr[i]);
  }return acc;
};

/**
 * Like native `Array.prototype.reduceRight`.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @param {*} [accumulator] The initial value.
 * @returns {*} The accumulated value.
 */
var reduceRight = function reduceRight(arr, fn, acc) {
  var i = arr.length;
  while (i--) {
    acc = fn(acc, arr[i]);
  }return acc;
};

exports.map = map;
exports.mapIdx = mapIdx;
exports.every = every;
exports.some = some;
exports.forEach = forEach;
exports.forEachIdx = forEachIdx;
exports.filter = filter;
exports.find = find;
exports.findUniq = findUniq;
exports.findIndex = findIndex;
exports.reduce = reduce;
exports.reduceRight = reduceRight;

return exports;

}({}));
