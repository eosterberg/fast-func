const exportStatement = 'module.exports ='
const indentation = 2

const loopBase = {
  exportStatement: exportStatement,
  indexVarName: 'i',
  lengthVarName: 'l',
  argList: ['arr', 'fn'],
  indentation
}

const reduceBase = {
  ...base,
  loopBody: 'acc = fn(acc, arr[i])',
  argList: ['arr', 'fn', 'acc'],
  returnStatement: 'acc'
}

const extendLoopBase = props => ({...base, ...props})
const extendReduceBase = props => ({...reduceBase, ...props})

const functions = {
  map: extendLoopBase({
    loopDirection: 'reverse',
    loopBody: 'out[i] = fn(arr[i])',
    setupVars: ['out = new Array(i)'],
    returnStatement: 'out'
  }),
  mapIdx: extendLoopBase({
    loopDirection: 'reverse',
    loopBody: 'out[i] = fn(arr[i], i)',
    setupVars: ['out = new Array(i)'],
    returnStatement: 'out'
  }),
  every: extendLoopBase({
    loopDirection: 'reverse',
    loopBody: 'if (!fn(arr[i])) return false',
    returnStatement: 'true'
  }),
  some: extendLoopBase({
    loopDirection: 'reverse',
    loopBody: 'if (fn(arr[i])) return true',
    returnStatement: 'false'
  }),
  forEach: extendLoopBase({
    loopBody: 'fn(arr[i])',
  }),
  filter: extendLoopBase({
    loopBody: 'val = arr[i]\nif (fn(val)) out.push(val)',
    setupVars: ['out = []', 'val'],
    returnStatement: 'out'
  }),
  find: extendLoopBase({
    loopBody: 'if (fn(arr[i])) return arr[i]'
  }),
  findUniq: extendLoopBase({
    loopDirection: 'reverse',
    loopBody: 'if (fn(arr[i])) return arr[i]'
  }),
  findIndex: extendLoopBase({
    loopBody: 'if (fn(arr[i])) return i'
  }),
  reduce: extendReduceBase({}),
  reduceRight: extendReduceBase({
    ...reduceBase,
    loopDirection: 'reverse'
  })
}

module.exports = {
  exportStatement,
  indentation,
  functions
}
