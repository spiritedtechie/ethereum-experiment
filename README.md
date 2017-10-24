Based on tutorial from here: https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2

# Prerequisites

1. Install solc if you compile using this approach rather than via javascript

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

1. Get local account. These are the public key addresses:

```
node get_accounts.js
```

2. Compile contract using Javascript

```
node compile.js
```

3. Compile contract using solc

???

4. Deploy contract

```
node deploy_contract.js
```
