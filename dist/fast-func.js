export const map = (arr, fn) => {
  var i = arr.length, out = new Array(i)
  while (i--) out[i] = fn(arr[i])
  return out
}

export const mapIdx = (arr, fn) => {
  var i = arr.length, out = new Array(i)
  while (i--) out[i] = fn(arr[i], i)
  return out
}

export const every = (arr, fn) => {
  var i = arr.length
  while (i--) if (!fn(arr[i])) return false
  return true
}

export const some = (arr, fn) => {
  var i = arr.length
  while (i--) if (fn(arr[i])) return true
  return false
}

export const forEach = (arr, fn) => {
  for (var i = 0, l = arr.length; i < l; i++) fn(arr[i])
}

export const filter = (arr, fn) => {
  for (var i = 0, l = arr.length, out = []; i < l; i++) if (fn(arr[i])) out.push(arr[i])
  return out
}

export const find = (arr, fn) => {
  for (var i = 0, l = arr.length; i < l; i++) if (fn(arr[i])) return arr[i]
}

export const findUniq = (arr, fn) => {
  var i = arr.length
  while (i--) if (fn(arr[i])) return arr[i]
}

export const findIndex = (arr, fn) => {
  for (var i = 0, l = arr.length; i < l; i++) if (fn(arr[i])) return i
}

export const reduce = (arr, fn, acc) => {
  for (var i = 0, l = arr.length; i < l; i++) acc = fn(acc, arr[i])
  return acc
}

export const reduceRight = (arr, fn, acc) => {
  var i = arr.length
  while (i--) acc = fn(acc, arr[i])
  return acc
}