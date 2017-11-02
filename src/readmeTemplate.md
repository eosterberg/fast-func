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
