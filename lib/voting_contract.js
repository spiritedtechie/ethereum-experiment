// web3 is an Ethereum client library
const fs = require("fs");
const path = require('path');
const web3 = require('./web3');

// Get contract Abi
const contractsBaseDir = path.join(__dirname, '..', 'contracts');
const contractAbi = JSON.parse(fs.readFileSync(path.join(contractsBaseDir, "Voting-interface.json")));

// create contract interaction object using Abi
const votingContract = web3.eth.contract(contractAbi);

const contractInstance = function(address) {
  return votingContract.at(address)
}

module.exports = {
  instance: contractInstance
};
