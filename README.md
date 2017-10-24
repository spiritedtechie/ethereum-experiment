Based on tutorial from here: https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2

# Prerequisites

1. Install solc if you compile Solidity using this approach rather than via Javascript

https://solidity.readthedocs.io/en/develop/installing-solidity.html

For Mac:

```
brew update
brew upgrade
brew tap ethereum/ethereum
brew install solidity
brew linkapps solidity
```

2. Install npm modules. In the project root:

```
npm install ethereumjs-testrpc web3@0.20.1 solc
```

3. Start the local Ethereum Blockchain and server

```
./node_modules/.bin/testrpc
```

# Development Setup & Workflow

1. Get a list of local testrpc accounts. These are the public key addresses:

```
node ./lib/get_accounts.js
```

2. Compile contract using Javascript

```
node ./build/compile.js
```

3. Compile contract using solc

???

4. Deploy contract

```
node ./build/deploy_contract.js
```

5. Interact with contract programmatically via the Node console

```
node
votingContract = require('./lib/voting_contract')
instance = votingContract.instance('0xb511274cc89934766ec073b1f44ae7ca5f57f962')
instance.totalVotesFor.call('Bob')

instance.voteForCandidate('Bob', {from: '0x95b5e727b6d981b8bf0cf70d5a5728cb280dd884'})
instance.totalVotesFor.call('Bob')

instance.voteForCandidate('Bob', {from: '0x95b5e727b6d981b8bf0cf70d5a5728cb280dd884'})
instance.totalVotesFor.call('Bob')
```

Check out the testrpc console output whilst you are doing this.
