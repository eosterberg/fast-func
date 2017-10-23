const exportStatement = 'module.exports ='
const indentation = 2

const testInput = {
  sortedList: [1,2,3,4,5,6,7,8,9,10]
}
const testFunctions = {
  modulo: (i) => i % 2,
  lessThan: (i) => i < 5
}

const loopBase = {
  exportStatement: exportStatement,
  indexVarName: 'i',
  lengthVarName: 'l',
  argList: ['arr', 'fn'],
  indentation,
  testInput: testInput.sortedList,
  testFunction: testFunctions.lessThan
}

const reduceBase = {
  ...loopBase,
  loopBody: 'acc = fn(acc, arr[i])',
  argList: ['arr', 'fn', 'acc'],
  returnStatement: 'acc'
}

const extendLoopBase = props => ({...loopBase, ...props})
const extendReduceBase = props => ({...reduceBase, ...props})

const functions = {
  map: extendLoopBase({
    loopDirection: 'reverse',
    loopBody: 'out[i] = fn(arr[i])',
    setupVars: ['out = new Array(i)'],
    returnStatement: 'out',
    compareWith: 'map'
  }),
  mapIdx: extendLoopBase({
    loopDirection: 'reverse',
    loopBody: 'out[i] = fn(arr[i], i)',
    setupVars: ['out = new Array(i)'],
    returnStatement: 'out',
    compareWith: 'map'
  }),
  every: extendLoopBase({
    loopDirection: 'reverse',
    loopBody: 'if (!fn(arr[i])) return false',
    returnStatement: 'true',
    compareWith: 'every'
  }),
  some: extendLoopBase({
    loopDirection: 'reverse',
    loopBody: 'if (fn(arr[i])) return true',
    returnStatement: 'false',
    compareWith: 'some'
  }),
  forEach: extendLoopBase({
    loopBody: 'fn(arr[i])',
    compareWith: 'forEach'
  }),
  filter: extendLoopBase({
    loopBody: 'val = arr[i]\nif (fn(val)) out.push(val)',
    setupVars: ['out = []', 'val'],
    returnStatement: 'out',
    compareWith: 'filter'
  }),
  find: extendLoopBase({
    loopBody: 'if (fn(arr[i])) return arr[i]',
    compareWith: 'find'
  }),
  findUniq: extendLoopBase({
    loopDirection: 'reverse',
    loopBody: 'if (fn(arr[i])) return arr[i]',
    compareWith: 'find'
  }),
  findIndex: extendLoopBase({
    loopBody: 'if (fn(arr[i])) return i',
    compareWith: 'findIndex'
  }),
  reduce: extendReduceBase({
    compareWith: 'reduce'
  }),
  reduceRight: extendReduceBase({
    ...reduceBase,
    loopDirection: 'reverse',
    compareWith: 'reduceRight'
  }),
}

module.exports = {
  exportStatement,
  indentation,
  functions
}
