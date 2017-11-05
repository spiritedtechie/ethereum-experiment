// web3 is an Ethereum client library
const fs = require("fs");
const path = require('path');
const web3 = require('./web3');

const buildOutDir = path.join(__dirname, '..', 'build-out')
const buildOutContractsDir = path.join(buildOutDir, 'contracts')

// Get contract Abi
const contractCompiled = JSON.parse(fs.readFileSync(path.join(buildOutContractsDir, "Voting.json")));
const contractAbi = JSON.parse(contractCompiled["contracts"][':Voting'].interface);

// create contract interaction object using Abi
const votingContract = web3.eth.contract(contractAbi);

const contractInstance = function(address) {
  return votingContract.at(address)
}

module.exports = {
  instance: contractInstance
};
