const MAIN_LIB = 'fast-func'
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
  exportStatement: 'export default',
  indexVarName: 'i',
  lengthVarName: 'l',
  argList: ['arr', 'fn'],
  indentation,
  testInput: testInput.sortedNumberList,
  testLambda: testLambdas.modulo,
  shouldBuild: true,
  shouldTest: true,
  shouldBenchmark: true,
  includedInLibs: [MAIN_LIB],
}

const mapBase = {
  ...loopBase,
  returnDescription: '{Array} The new mapped array.'
}

const findBase = {
  ...loopBase,
  testLambda: testLambdas.find42,
  compareWith: 'find',
  returnDescription: '{*} The value if found, else undefined.'
}

const reduceBase = {
  ...loopBase,
  loopBody: 'acc = fn(acc, arr[i])',
  argList: ['arr', 'fn', 'acc'],
  returnStatement: 'acc',
  testLambda: testLambdas.sum,
  additionalTestArg: 0,
  returnDescription: '{*} The accumulated value.'
}

const extendLoopBase = props => ({...loopBase, ...props})
const extendMapBase = props => ({...mapBase, ...props})
const extendReduceBase = props => ({...reduceBase, ...props})
const extendFindBase = props => ({...findBase, ...props})

let functions = {
  map: extendMapBase({
    description: `\
Like native \`Array.prototype.map\` except it
runs from right->left and only invokes the iteratee
with each item (not index). Use \`mapIdx\` if index is
needed as a second argument.`,
    loopDirection: 'reverse',
    loopBody: 'out[i] = fn(arr[i])',
    setupVars: ['out = new Array(i)'],
    returnStatement: 'out',
    compareWith: 'map'
  }),
  mapIdx: extendMapBase({
    description: `\
Like \`.map\`, but also invokes the iteratee with index as
second argument.`,
    loopDirection: 'reverse',
    loopBody: 'out[i] = fn(arr[i], i)',
    setupVars: ['out = new Array(i)'],
    returnStatement: 'out',
    compareWith: 'map'
  }),
  every: extendLoopBase({
    description: `\
Like native \`Array.prototype.every\` except it
runs from right->left and only invokes the iteratee
with each item (not index).`,
    loopDirection: 'reverse',
    loopBody: 'if (!fn(arr[i])) return false',
    returnStatement: 'true',
    compareWith: 'every'
  }),
  some: extendLoopBase({
    description: `\
Like native \`Array.prototype.some\` except it
runs from right->left and only invokes the iteratee
with each item (not index).`,
    loopDirection: 'reverse',
    loopBody: 'if (fn(arr[i])) return true',
    returnStatement: 'false',
    compareWith: 'some'
  }),
  forEach: extendLoopBase({
    description: `\
Like native \`Array.prototype.forEach\` except it
only invokes the iteratee with each item (not index).
It iterates left->right to keep compatibility with native forEach
and avoid confusion.`,
    loopBody: 'fn(arr[i])',
    compareWith: 'forEach'
  }),
  forEachIdx: extendLoopBase({
    description: `\
Like \`.forEach\`, but also invokes the iteratee with index as
second argument.`,
    loopBody: 'fn(arr[i], i)',
    compareWith: 'forEach'
  }),
  filter: extendLoopBase({
    description: `\
Like native \`Array.prototype.filter\` except it
only invokes the iteratee with each item (not index).
It iterates left->right to keep compatibility with native
filter and avoid confusion.`,
    loopBody: 'if (fn(arr[i])) out.push(arr[i])',
    setupVars: ['out = []'],
    returnStatement: 'out',
    compareWith: 'filter'
  }),
  find: extendFindBase({
    description: `\
Like native \`Array.prototype.find\` except it
only invokes the iteratee with each item (not index).
It iterates left->right to keep compatibility with native
find and avoid confusion.`,
    loopBody: 'if (fn(arr[i])) return arr[i]'
  }),
  findUniq: extendFindBase({
    description: `\
Like native \`Array.prototype.find\` except it
only invokes the iteratee with each item (not index) and
iterates right->left.`,
    loopDirection: 'reverse',
    loopBody: 'if (fn(arr[i])) return arr[i]'
  }),
  findIndex: extendFindBase({
    description: `\
Like native \`Array.prototype.findIndex\`.`,
    loopBody: 'if (fn(arr[i])) return i',
    compareWith: 'findIndex',
  }),
  reduce: extendReduceBase({
    description: `\
Like native \`Array.prototype.reduce\`.`,
    compareWith: 'reduce'
  }),
  reduceRight: extendReduceBase({
    description: `\
Like native \`Array.prototype.reduceRight\`.`,
    ...reduceBase,
    loopDirection: 'reverse',
    compareWith: 'reduceRight'
  }),
}

module.exports = {
  indentation,
  functions,
  libs: [MAIN_LIB]
}
