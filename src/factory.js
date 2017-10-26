const createIndenter = (depth, indentation) => s => ' '.repeat(depth * indentation) + s

const loopBasedFunction = (template) => {
  const indent1 = createIndenter(1, template.indentation)
  const indent2 = createIndenter(2, template.indentation)

  let setupVars = []
  let loopBody = template.loopBody.split('\n')
  if (loopBody.length > 1) {
    loopBody = `{\n` + loopBody.map(indent2).join('\n') + '\n' + indent1('}\n')
  } else {
    loopBody = loopBody[0] + '\n'
  }

  if (template.loopDirection === 'reverse') {
    setupVars = [template.indexVarName + ' = ' + template.argList[0] + '.length']
    if (template.setupVars && template.setupVars.length) {
      setupVars = setupVars.concat(template.setupVars)
    }
    setupVars = indent1('var ') + setupVars.join(', ') + '\n'
    loopBody = setupVars + indent1(`while (${template.indexVarName}--) `) + loopBody
  } else {
    setupVars = [template.indexVarName + ' = 0', template.lengthVarName + ' = ' + template.argList[0] + '.length']
    if (template.setupVars && template.setupVars.length) {
      setupVars = setupVars.concat(template.setupVars)
    }
    setupVars = ('var ') + setupVars.join(', ')
    loopBody = indent1(`for (${setupVars}; ${template.indexVarName} < ${template.lengthVarName}; ${template.indexVarName}++) `) + loopBody
  }

  const argList = template.argList.length > 1 ? `(${template.argList.join(', ')})` : template.argList[0]
  const returnStatement = template.returnStatement ? indent1('return ' + template.returnStatement + '\n') : ''
  return `${template.exportStatement} ${argList} => {\n` +
  `${loopBody}` +
  `${returnStatement}` +
  `}`
}

const buildLib = (libName, template) => {
  const libCode = Object.entries(template.functions)
  .filter(entries => entries[1].includedInLibs.includes(libName))
  .map(entries => {
    const [name, template] = entries
    const code = loopBasedFunction({
      ...template,
      exportStatement: `export const ${name} =`
    })
    return code
  })
  .join('\n\n')

  return libCode
}

module.exports = {
  loopBasedFunction,
  buildLib
}
