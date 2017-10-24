const fs = require("fs");
web3 = require("./web3_config")

const compiledContract = fs.readFileSync("./contracts/Voting.json");
const contracts = JSON.parse(compiledContract)["contracts"];
const votingContractAbi = JSON.parse(contracts[':Voting'].interface);
const votingContractByteCode = contracts[':Voting'].bytecode;

console.log("Contract interface (ABI): ")
console.log(votingContractAbi)

// deploy contract using first account in local blockchain
// obviously only useful for local testing
// in a real blockchain, you would have to use a real accounts
// and unlock it first before transacting
console.log("Deploying contract... ")
const votingContract = web3.eth.contract(votingContractAbi)
votingContract.new(
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
