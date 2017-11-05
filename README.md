Based on tutorial from here: https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2

This experiment uses a raw Javascript/Node environment, with all compilation/deployment/interaction of the Ethereum contract performed via Javascript code, using the solc and web3 libraries. 

I will likely create another repo, for the same Polling Station application but build using Truffle development framework, which is the recommended way to develop DApps. 

This 'lower level of abstraction' approach was chosen to closer to learning how it all works underneath the covers.

# Prerequisites

1. Solc - if you compile Solidity using the command line rather than via Javascript

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

ethereumjs-testrpc - test Ethereum server that can be ran locally
solc - compilation library for Solidity contracts
web3 - client library for Ethereum

```
npm install ethereumjs-testrpc web3@0.20.1 solc
```

3. Start the local Ethereum Blockchain and server in a background terminal:

```
./node_modules/.bin/testrpc
```

# Development Setup & Workflow

1. Get a list of local testrpc accounts. These are the public key addresses:

```
node ./lib/get_accounts.js
```

2. Compile/deploy the contract, and build the web application:

```
node ./build/build.js
```

Note down the contract address, as you will need it for the web app.

# Polling Station Programmatic Interface

Once the build is complete, you can interact with contract programmatically via the Node console

```
node
votingContract = require('./lib/voting_contract')
instance = votingContract.instance('<contract_address>')
instance.totalVotesFor.call('Bob')

instance.voteForCandidate('Bob', {from: '<user_account_public_key>'})
instance.totalVotesFor.call('Bob')

instance.voteForCandidate('Bob', {from: '<user_account_public_key>'})
instance.totalVotesFor.call('Bob')
```

Check out the testrpc console output whilst you are doing this.

# Polling Station Web Interface

Once the build is complete, open the file <project_root>/build-out/webapp/index.html in a browser.

Vote for someone!
