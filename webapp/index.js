const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
VotingContract = web3.eth.contract(abi);
contractInstance = VotingContract.at('0xb511274cc89934766ec073b1f44ae7ca5f57f962');

// No apparent way to return arrays from Solidity contract
const candidateNames = ["Bob", "Tom", "Joe"]

function voteForCandidate() {
  const candidateName = $("#candidate").val();
  contractInstance.voteForCandidate(
    candidateName,
    {
      from: web3.eth.accounts[0]
    },
    function() {
      $("#" + candidateName.toLowerCase()).html(contractInstance.totalVotesFor.call(candidateName).toString());
    });
}

$(document).ready(function() {
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + name.toLowerCase()).html(val);
  }
});
