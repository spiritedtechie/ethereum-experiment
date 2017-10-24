// web3 is an Ethereum client library
const fs = require("fs");
const web3 = require('./web3.js')

// Get abi from compiled contract
const compiledContract = fs.readFileSync("./contracts/Voting.json");
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
