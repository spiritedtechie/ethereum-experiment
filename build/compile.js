const fs = require('fs')
const path = require('path');
const solc = require('solc')

const filesBaseDir = path.join(__dirname, '..', 'contracts');

// read the contract source
const sourcePath = path.join(filesBaseDir, 'Voting.sol');
const sourceContract = fs.readFileSync(sourcePath).toString()

// compile contract
const compiledContract = solc.compile(sourceContract)
console.log("Compiled contract:")
console.log(compiledContract)

// write out the compiled contract file as json
const outputPath = path.join(filesBaseDir, 'Voting.json');
fs.writeFile(outputPath, JSON.stringify(compiledContract), function(err) {
  if (err) console.log(err)
  else console.log("Successfully written compiled contract to file")
})
