const fs = require("fs");
const Web3Configured = require("./web3_config")
const web3 = Web3Configured.web3

const compiledContract = fs.readFileSync("./contracts/Voting.json");
const contracts = JSON.parse(compiledContract)["contracts"];
const votingContract = contracts[':Voting']
const votingContractAbi = JSON.parse(votingContract.interface);
const votingContractByteCode = votingContract.bytecode;

console.log("Contract interface: ")
console.log(votingContractAbi)

console.log("Deploying contract... ")
const VotingContract = web3.eth.contract(votingContractAbi)

// deploy contract using first account in local blockchain
// obviously only useful for local testing
// in a real blockchain, you would have to use a real accounts
// and unlock it first before transacting
VotingContract.new(
  ['Bob', 'Tom', 'Joe'],
  {
    data: votingContractByteCode,
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
