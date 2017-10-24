const Web3 = require('web3');
const web3_provider = 'http://localhost:8545';

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(web3_provider));

module.exports = web3;
