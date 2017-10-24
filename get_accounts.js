const Web3Configured = require('./web3_config.js')
const web3 = Web3Configured.web3

console.log("Ethereum Accounts (public keys):")
console.log(web3.eth.accounts)
