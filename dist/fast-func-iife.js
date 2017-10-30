var FastFunc = (function (exports) {
'use strict';

var map = function map(arr, fn) {
  var i = arr.length,
      out = new Array(i);
  while (i--) {
    out[i] = fn(arr[i]);
  }return out;
};

var mapIdx = function mapIdx(arr, fn) {
  var i = arr.length,
      out = new Array(i);
  while (i--) {
    out[i] = fn(arr[i], i);
  }return out;
};

var every = function every(arr, fn) {
  var i = arr.length;
  while (i--) {
    if (!fn(arr[i])) return false;
  }return true;
};

var some = function some(arr, fn) {
  var i = arr.length;
  while (i--) {
    if (fn(arr[i])) return true;
  }return false;
};

var forEach = function forEach(arr, fn) {
  for (var i = 0, l = arr.length; i < l; i++) {
    fn(arr[i]);
  }
};

var filter = function filter(arr, fn) {
  for (var i = 0, l = arr.length, out = []; i < l; i++) {
    if (fn(arr[i])) out.push(arr[i]);
  }return out;
};

var find = function find(arr, fn) {
  for (var i = 0, l = arr.length; i < l; i++) {
    if (fn(arr[i])) return arr[i];
  }
};

var findUniq = function findUniq(arr, fn) {
  var i = arr.length;
  while (i--) {
    if (fn(arr[i])) return arr[i];
  }
};

var findIndex = function findIndex(arr, fn) {
  for (var i = 0, l = arr.length; i < l; i++) {
    if (fn(arr[i])) return i;
  }
};

var reduce = function reduce(arr, fn, acc) {
  for (var i = 0, l = arr.length; i < l; i++) {
    acc = fn(acc, arr[i]);
  }return acc;
};

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
exports.filter = filter;
exports.find = find;
exports.findUniq = findUniq;
exports.findIndex = findIndex;
exports.reduce = reduce;
exports.reduceRight = reduceRight;

return exports;

}({}));
