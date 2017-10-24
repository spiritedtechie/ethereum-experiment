const fs = require('fs')
const path = require('path');
const solc = require('solc')

const contractBaseDir = path.join(__dirname, '..', 'contracts');

// read the contract source
const contractPath = path.join(contractBaseDir, 'Voting.sol');
const contractDef = fs.readFileSync(contractPath).toString()

// compile contract
const compiledContract = solc.compile(contractDef)
const contractAbi = JSON.parse(compiledContract["contracts"][':Voting'].interface);

// write out the compiled contract file as json
const contractOutputPath = path.join(contractBaseDir, 'Voting.json');
fs.writeFile(contractOutputPath, JSON.stringify(compiledContract), function(err) {
  if (err) console.log(err)
  else console.log("Successfully written compiled contract to file")
})

// write out the contract ABI as json (to be shared with all involved in the contract)
const contractAbiOutputPath = path.join(contractBaseDir, 'Voting-Interface.json');
fs.writeFile(contractAbiOutputPath, JSON.stringify(contractAbi), function(err) {
  if (err) console.log(err)
  else console.log("Successfully written compiled contract ABI to file")
})
