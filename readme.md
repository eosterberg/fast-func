# FastFunc

Fast, simple array functions.

On Node.js, Chrome and Safari, performance is about x10 compared with regular array functions.

## Build

`$ npm run compile`

## Benchmark

`$ npm run benchmark`

See history [here](./benchmark/history)

## Test

`$ npm test`

## Api

```
// example:
const fastFunc = require('fast-func')
fastFunc.map([1, 2, 3], num => num * 2) // -> [2, 4, 6]
```

`.map(array, iteratee)`
Like native `Array.prototype.map` except it
runs from right->left and only invokes the iteratee
with each item (not index). Use `mapIdx` if index is
needed as a second argument.

`.mapIdx(array, iteratee)`
Like `.map`, but also invokes the iteratee with index as
second argument.

`.every(array, iteratee)`
Like native `Array.prototype.every` except it
runs from right->left and only invokes the iteratee
with each item (not index).

`.some(array, iteratee)`
Like native `Array.prototype.some` except it
runs from right->left and only invokes the iteratee
with each item (not index).

`.forEach(array, iteratee)`
Like native `Array.prototype.forEach` except it
only invokes the iteratee with each item (not index).
It iterates left->right to keep compatibility with native forEach
and avoid confusion.

`.forEachIdx(array, iteratee)`
Like `.forEach`, but also invokes the iteratee with index as
second argument.

`.filter(array, iteratee)`
Like native `Array.prototype.filter` except it
only invokes the iteratee with each item (not index).
It iterates left->right to keep compatibility with native
filter and avoid confusion.

`.find(array, iteratee)`
Like native `Array.prototype.find` except it
only invokes the iteratee with each item (not index).
It iterates left->right to keep compatibility with native
find and avoid confusion.

`.findUniq(array, iteratee)`
Like native `Array.prototype.find` except it
only invokes the iteratee with each item (not index) and
iterates right->left.

`.findIndex(array, iteratee)`
Like native `Array.prototype.findIndex`.

`.reduce(array, iteratee, accumulator)`
Like native `Array.prototype.reduce`.

`.reduceRight(array, iteratee, accumulator)`
Like native `Array.prototype.reduceRight`.
