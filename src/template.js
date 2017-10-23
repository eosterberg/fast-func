const exportStatement = 'module.exports ='
const indentation = 2

const generateNumList = (size) => {
  for (var i = 0, list = []; i < size; i++) list[i] = i
  return list
}

const testInput = {
  sortedNumberList: generateNumList(100)
}
const testLambdas = {
  modulo: (i) => i % 2,
  find42: (i) => i === 42,
  sum: (a, b) => a + b
}

const loopBase = {
  exportStatement: exportStatement,
  indexVarName: 'i',
  lengthVarName: 'l',
  argList: ['arr', 'fn'],
  indentation,
  testInput: testInput.sortedNumberList,
  testLambda: testLambdas.modulo
}

const findBase = {
  ...loopBase,
  testLambda: testLambdas.find42,
  compareWith: 'find'
}

const reduceBase = {
  ...loopBase,
  loopBody: 'acc = fn(acc, arr[i])',
  argList: ['arr', 'fn', 'acc'],
  returnStatement: 'acc',
  testLambda: testLambdas.sum,
  additionalTestArg: 0
}

const extendLoopBase = props => ({...loopBase, ...props})
const extendReduceBase = props => ({...reduceBase, ...props})
const extendFindBase = props => ({...findBase, ...props})

let functions = {
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
  find: extendFindBase({
    loopBody: 'if (fn(arr[i])) return arr[i]'
  }),
  findUniq: extendFindBase({
    loopDirection: 'reverse',
    loopBody: 'if (fn(arr[i])) return arr[i]'
  }),
  findIndex: extendFindBase({
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
