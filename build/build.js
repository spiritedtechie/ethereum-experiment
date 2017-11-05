const compile_contract = require('./compile_contract.js');
const deploy_contract = require('./deploy_contract.js');
const compile_webapp = require('./webapp.js');

const build = function() {
  compile_contract();
  deploy_contract();
  compile_webapp();
};

module.exports = build;
if(require.main == module) build();
