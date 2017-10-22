const base = {
  exportStatement: 'module.exports =',
  indexVarName: 'i',
  lengthVarName: 'l',
  argList: ['arr', 'fn']
}

const reduceBase = {
  ...base,
  loopBody: 'acc = fn(acc, arr[i])',
  argList: ['arr', 'fn', 'acc'],
  returnStatement: 'acc'
}

module.exports = {
  map: {
    ...base,
    loopDirection: 'reverse',
    loopBody: 'out[i] = fn(arr[i])',
    setupVars: ['out = new Array(i)'],
    returnStatement: 'out'
  },
  every: {
    ...base,
    loopDirection: 'reverse',
    loopBody: 'if (!fn(arr[i])) return false',
    returnStatement: 'true'
  },
  some: {
    ...base,
    loopDirection: 'reverse',
    loopBody: 'if (fn(arr[i])) return true',
    returnStatement: 'false'
  },
  forEach: {
    ...base,
    loopBody: 'fn(arr[i])',
  },
  filter: {
    ...base,
    loopBody: 'val = arr[i]\nif (fn(val)) out.push(val)',
    setupVars: ['out = []', 'val'],
    returnStatement: 'out'
  },
  reduce: reduceBase,
  reduceRight: {
    ...reduceBase,
    loopDirection: 'reverse'
  }
}
