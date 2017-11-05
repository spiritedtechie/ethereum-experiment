const fs = require('fs-extra')
const path = require('path');

const webappSourceDir = path.join(__dirname, '..', 'src', 'webapp')
const buildOutDir = path.join(__dirname, '..', 'build-out')
if (!fs.existsSync(buildOutDir)) fs.mkdirSync(buildOutDir);
const buildOutContractsDir = path.join(buildOutDir, 'contracts')
if (!fs.existsSync(buildOutContractsDir)) fs.mkdirSync(buildOutContractsDir);
const buildOutWebappDir = path.join(buildOutDir, 'webapp')
if (!fs.existsSync(buildOutWebappDir)) fs.mkdirSync(buildOutWebappDir);


function compile_webapp() {
  // write abi
  const contractCompiled = JSON.parse(fs.readFileSync(path.join(buildOutContractsDir, "Voting.json")));
  const contractAbi = JSON.parse(contractCompiled["contracts"][':Voting'].interface);
  const contractAbiOutputPath = path.join(buildOutWebappDir, 'voting-abi.js');
  fs.writeFile(contractAbiOutputPath, "abi = " + JSON.stringify( contractAbi), function(err) {
    if (err) console.log(err)
    else console.log("Contract ABI was written")
  })

  // copy candidates file
  const candidatesSourceFile = path.join(__dirname, 'candidates.js')
  const candidatesTargetFile = path.join(buildOutWebappDir, 'candidates.js')
  fs.copyFile(candidatesSourceFile, candidatesTargetFile, (err) => {
      if (err) throw err;
      console.log('Candidates source file was copied');
  });

  // copy over webapp files
  fs.copy(webappSourceDir, buildOutWebappDir, function (err) {
    if (err) return console.error(err)
    console.log('Webapp sources were copied')
  });
}

module.exports = compile_webapp;
if(require.main == module) compile_webapp();
