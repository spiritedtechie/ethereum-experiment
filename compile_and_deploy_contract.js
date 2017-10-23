fs = require('fs')
Web3 = require('web3')
solc = require('solc')

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log("Accounts: " + web3.eth.accounts)

// Fetch and compile code
code = fs.readFileSync('Voting.sol').toString()
compiledCode = solc.compile(code)

// Deploy contract
abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
VotingContract = web3.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':Voting'].bytecode
deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
console.log("Deployed contract address: " + deployedContract.address)
contractInstance = VotingContract.at(deployedContract.address)
