const fs = require("fs");
const path = require('path');
const web3 = require("../lib/web3")

const contractsBaseDir = path.join(__dirname, '..', 'contracts');
const compiledContract = JSON.parse(fs.readFileSync(path.join(contractsBaseDir, "Voting.json")));
const contractAbi = JSON.parse(compiledContract["contracts"][':Voting'].interface);
const contractByteCode = compiledContract["contracts"][':Voting'].bytecode;

// deploy contract using first account in local blockchain
// obviously only useful for local testing
// in a real blockchain, you would have to use a real accounts
// and unlock it first before transacting
console.log("Deploying contract... ")
const votingContract = web3.eth.contract(contractAbi)
votingContract.new(
  ['Bob', 'Tom', 'Joe'],
  {
    data: contractByteCode,
    from: web3.eth.accounts[0],
    gas: 4700000
  },
  function(err, contract) {
    if (err) {
      console.log("Error deploying contract")
      console.log(err)
    } else if (!contract.address) {
      console.log("Tx hash: " + contract.transactionHash + " waiting to be mined...");
    } else {
      console.log("Tx hash: " + contract.transactionHash + " now mined");
      console.log("Contract address: " + contract.address)
    }
  }
)
