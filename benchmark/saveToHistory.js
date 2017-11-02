const fs = require('fs')
const process = require('process')
const path = require('path')

saveToHistory = results => {
  const info = Object.entries(process.release).map(entry => {
    return entry[0] + ': ' + entry[1]
  }).join('\n') +
  '\narch: ' + process.arch +
  '\nplatform: ' + process.platform

  results.push(info)
  const dateTime = new Date().toISOString().split('.')[0]
  const historyPath = path.resolve(__dirname + '/history/' + dateTime)
  fs.writeFile(historyPath, results.join('\n\n'), err => {
    if (err) console.log(err)
  })
}

module.exports = saveToHistory
