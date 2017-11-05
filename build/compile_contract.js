const fs = require('fs-extra');
const path = require('path');
const solc = require('solc');

const contractSourceDir = path.join(__dirname, '..', 'src', 'contracts');
const buildOutDir = path.join(__dirname, '..', 'build-out')
if (!fs.existsSync(buildOutDir)) fs.mkdirSync(buildOutDir);
const buildOutContractsDir = path.join(buildOutDir, 'contracts')
if (!fs.existsSync(buildOutContractsDir)) fs.mkdirSync(buildOutContractsDir);

const compile = function () {

  // read the contract source
  const contractSourceFile = path.join(contractSourceDir, 'Voting.sol');
  const contractSourceDef = fs.readFileSync(contractSourceFile).toString()

  // compile contract
  const contractCompiledData = solc.compile(contractSourceDef)

  // write out the compiled contract file as json
  const contractCompiledFile = path.join(buildOutContractsDir, 'Voting.json');
  fs.writeFileSync(contractCompiledFile, JSON.stringify(contractCompiledData));
  console.log("Written compiled contract")
}

module.exports = compile;
if(require.main == module) compile();
