// web3 is an Ethereum client library
const web3 = require('web3_config.js')

// Get abi from compiled contract
const abi = require('../solidity/build/contracts/Voting.json').abi;
// create contract interaction object
const VotingContract = web3.eth.contract(abi);

module.exports = VotingContract;
