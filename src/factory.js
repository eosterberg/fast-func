const createIndenter = (depth, indentation) => s => ' '.repeat(depth * indentation) + s

const fullArgDescription = argType => {
  switch (argType) {
    case 'arr': return '{Array} array The array to iterate over.'
    case 'fn': return '{Function} iteratee The iteratee invoked per element.'
    case 'acc': return '{*} [accumulator] The initial value.'
  }
}

const docsArgNames = args => args.map(arg => {
  switch (arg) {
    case 'arr': return 'array'
    case 'fn': return 'iteratee'
    case 'acc': return 'accumulator'
  }
}).join(', ')

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
    setupVars = 'var ' + setupVars.join(', ')
    loopBody = indent1(`for (${setupVars}; ${template.indexVarName} < ${template.lengthVarName}; ${template.indexVarName}++) `) + loopBody
  }

  const description = template.description ?
  '/**\n' +
  template.description.split('\n').map(s => ' * ' + s + '\n').join('') +
  ' *\n' +
  template.argList.map(s => ' * @param ' + fullArgDescription(s) + '\n').join('') +
  (template.returnDescription ? ` * @returns ${template.returnDescription}\n` : '') +
  ' */\n'
  : ''

  const argList = template.argList.length > 1 ? `(${template.argList.join(', ')})` : template.argList[0]
  const returnStatement = template.returnStatement ? indent1('return ' + template.returnStatement + '\n') : ''
  return `${description}${template.exportStatement} ${argList} => {\n` +
  `${loopBody}` +
  `${returnStatement}` +
  `}`
}

const buildLib = (libName, template) => {
  return Object.entries(template.functions)
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
}

const buildDocs = (libName, template) => {
  return Object.entries(template.functions)
  .filter(entries => entries[1].includedInLibs.includes(libName))
  .map(entries => {
    const [name, template] = entries
    return `\`.${name}(${docsArgNames(template.argList)})\`\n` + template.description
  })
  .join('\n\n')
}

module.exports = {
  loopBasedFunction,
  buildLib,
  buildDocs
}
