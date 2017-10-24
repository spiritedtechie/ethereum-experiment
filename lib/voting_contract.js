// web3 is an Ethereum client library
const fs = require("fs");
const path = require('path');
const web3 = require('./web3');

// Get abi from compiled contract
const contractsDir = path.join(__dirname, '..', 'contracts');
const compiledContract = fs.readFileSync(path.join(contractsDir, "Voting.json"));
const contracts = JSON.parse(compiledContract)["contracts"];
const votingContractAbi = JSON.parse(contracts[':Voting'].interface);

// create contract interaction object
const votingContract = web3.eth.contract(votingContractAbi);

const contractInstance = function(address) {
  return votingContract.at(address)
}

module.exports = {
  instance: contractInstance
};
