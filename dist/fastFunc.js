module.exports = {
  map: (arr, fn) => {
    var i = arr.length, out = new Array(i)
    while (i--) out[i] = fn(arr[i])
    return out
  },
  mapIdx: (arr, fn) => {
    var i = arr.length, out = new Array(i)
    while (i--) out[i] = fn(arr[i], i)
    return out
  },
  every: (arr, fn) => {
    var i = arr.length
    while (i--) if (!fn(arr[i])) return false
    return true
  },
  some: (arr, fn) => {
    var i = arr.length
    while (i--) if (fn(arr[i])) return true
    return false
  },
  forEach: (arr, fn) => {
    for (var i = 0, l = arr.length; i < l; i++) fn(arr[i])
  },
  filter: (arr, fn) => {
    for (var i = 0, l = arr.length, out = []; i < l; i++) if (fn(arr[i])) out.push(arr[i])
    return out
  },
  find: (arr, fn) => {
    for (var i = 0, l = arr.length; i < l; i++) if (fn(arr[i])) return arr[i]
  },
  findUniq: (arr, fn) => {
    var i = arr.length
    while (i--) if (fn(arr[i])) return arr[i]
  },
  findIndex: (arr, fn) => {
    for (var i = 0, l = arr.length; i < l; i++) if (fn(arr[i])) return i
  },
  reduce: (arr, fn, acc) => {
    for (var i = 0, l = arr.length; i < l; i++) acc = fn(acc, arr[i])
    return acc
  },
  reduceRight: (arr, fn, acc) => {
    var i = arr.length
    while (i--) acc = fn(acc, arr[i])
    return acc
  }
}