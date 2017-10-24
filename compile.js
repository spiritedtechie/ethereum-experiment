const fs = require('fs')
const solc = require('solc')

// read the contract source
const sourceContract = fs.readFileSync('./contracts/Voting.sol').toString()
// compile contract
const compiledContract = solc.compile(sourceContract)
console.log("Compiled contract:")
console.log(compiledContract)
// write out the compiled contract file as json
fs.writeFile('./contracts/Voting.json', JSON.stringify(compiledContract), function(err) {
  if (err) console.log(err)
  else console.log("Successfully written compiled contract to file")
})
