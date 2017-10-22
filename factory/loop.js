const indent2 = str => '  ' + str
const indent4 = str => '    ' + str

const arrayBasedFunction = opts => {
  let setupVars = []
  let loopBody = opts.loopBody.split('\n')
  if (loopBody.length > 1) {
    loopBody = `{\n` + loopBody.map(indent4).join('\n') + '\n' + indent2('}\n')
  } else {
    loopBody = loopBody[0] + '\n'
  }

  if (opts.loopDirection === 'reverse') {
    setupVars = [opts.indexVarName + ' = ' + opts.argList[0] + '.length']
    if (opts.setupVars && opts.setupVars.length) {
      setupVars = setupVars.concat(opts.setupVars)
    }
    setupVars = indent2('var ') + setupVars.join(', ') + '\n'
    loopBody = setupVars + indent2(`while (${opts.indexVarName}--) `) + loopBody
  } else {
    setupVars = [opts.indexVarName + ' = 0', opts.lengthVarName + ' = ' + opts.argList[0] + '.length']
    if (opts.setupVars && opts.setupVars.length) {
      setupVars = setupVars.concat(opts.setupVars)
    }
    setupVars = ('var ') + setupVars.join(', ')
    loopBody = indent2(`for (${setupVars}; ${opts.indexVarName} < ${opts.lengthVarName}; ${opts.indexVarName}++) `) + loopBody
  }

  const argList = opts.argList.length > 1 ? `(${opts.argList.join(', ')})` : opts.argList[0]
  const returnStatement = opts.returnStatement ? indent2('return ' + opts.returnStatement + '\n') : ''
  return `const ${opts.functionName} = ${argList} => {\n` +
  `${loopBody}` +
  `${returnStatement}` +
  `}\n`
}


const map = arrayBasedFunction({
  functionName: 'map',
  loopDirection: 'reverse',
  loopBody: 'out[i] = fn(arr[i])',
  indexVarName: 'i',
  argList: ['arr', 'fn'],
  setupVars: ['out = new Array(i)'],
  returnStatement: 'out'
})

console.log(map)

const every = arrayBasedFunction({
  functionName: 'every',
  loopDirection: 'reverse',
  loopBody: 'if (!fn(arr[i])) return false',
  indexVarName: 'i',
  argList: ['arr', 'fn'],
  returnStatement: 'true'
})

console.log(every)

const forEach = arrayBasedFunction({
  functionName: 'forEach',
  loopBody: 'fn(arr[i])',
  indexVarName: 'i',
  lengthVarName: 'l',
  argList: ['arr', 'fn']
})

console.log(forEach)


module.exports = arrayBasedFunction
