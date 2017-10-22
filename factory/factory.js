const createIndenter = (depth, indentation) => s => ' '.repeat(depth * indentation) + s

const loopBasedFunction = (opts) => {
  const indent1 = createIndenter(1, opts.indentation)
  const indent2 = createIndenter(2, opts.indentation)

  let setupVars = []
  let loopBody = opts.loopBody.split('\n')
  if (loopBody.length > 1) {
    loopBody = `{\n` + loopBody.map(indent2).join('\n') + '\n' + indent1('}\n')
  } else {
    loopBody = loopBody[0] + '\n'
  }

  if (opts.loopDirection === 'reverse') {
    setupVars = [opts.indexVarName + ' = ' + opts.argList[0] + '.length']
    if (opts.setupVars && opts.setupVars.length) {
      setupVars = setupVars.concat(opts.setupVars)
    }
    setupVars = indent1('var ') + setupVars.join(', ') + '\n'
    loopBody = setupVars + indent1(`while (${opts.indexVarName}--) `) + loopBody
  } else {
    setupVars = [opts.indexVarName + ' = 0', opts.lengthVarName + ' = ' + opts.argList[0] + '.length']
    if (opts.setupVars && opts.setupVars.length) {
      setupVars = setupVars.concat(opts.setupVars)
    }
    setupVars = ('var ') + setupVars.join(', ')
    loopBody = indent1(`for (${setupVars}; ${opts.indexVarName} < ${opts.lengthVarName}; ${opts.indexVarName}++) `) + loopBody
  }

  const argList = opts.argList.length > 1 ? `(${opts.argList.join(', ')})` : opts.argList[0]
  const returnStatement = opts.returnStatement ? indent1('return ' + opts.returnStatement + '\n') : ''
  return `${opts.exportStatement} ${argList} => {\n` +
  `${loopBody}` +
  `${returnStatement}` +
  `}`
}

const buildLib = spec => {
  const indent1 = createIndenter(1, spec.indentation)
  const functions = spec.functions
  const libCode = Object.keys(functions)
  .map(name => {
    const fnSpec = functions[name]
    const code = loopBasedFunction({
      ...fnSpec,
      exportStatement: name + ':'
    })
    return code.split('\n').map(indent1).join('\n')
  })
  .join(',\n')

  return spec.exportStatement + ' {\n' + libCode + '\n}'
}

module.exports = {
  loopBasedFunction,
  buildLib
}
