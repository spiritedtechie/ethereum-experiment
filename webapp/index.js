const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const VotingContract = web3.eth.contract(abi);
var contractInstance;

// No apparent way to return arrays from Solidity contract
const candidateNames = ["Bob", "Tom", "Joe"]

function loadVoteContractState() {
  contractAddress = $("#contract_address").val()
  contractInstance = VotingContract.at(contractAddress);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name, function(err, result) {
      if (err) {
        alert("Problem fetching vote state: " + err)
      } else {
        $("#" + name.toLowerCase()).html(result.toString());
      }
    })
  }
}

function voteForCandidate() {
  if (!contractInstance) {
    alert("You need to enter the contract address first")
    return
  }

  const userIdentity = $("#identity").val();
  if (!userIdentity){
    alert("You need to enter your identity/public key")
    return
  }

  const candidateName = $("#candidate").val();
  if (!candidateName){
    alert("You need to enter the candidate's name")
    return
  }

  // action vote
  contractInstance.voteForCandidate(
    candidateName,
    {
      from: userIdentity
    },
    function() {
      $("#" + candidateName.toLowerCase()).html(contractInstance.totalVotesFor.call(candidateName).toString());
    });
}

// Load contract/vote state on page ready (if possible)
$(document).ready(function() {
  contractAddress = $("#contract_address").val()
  if (contractAddress) {
    loadVoteContractState()
  }
});
