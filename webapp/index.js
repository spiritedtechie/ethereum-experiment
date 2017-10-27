const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const VotingContract = web3.eth.contract(abi);
var pollInstance;

// No apparent way to return arrays from Solidity contract
const candidates = [
  {id: "1", name: "Bob"},
  {id: "2", name: "Tom"},
  {id: "3", name: "Joe"}
];

function loadPollInstance() {
  const contractAddress = $("#contract_address").val();
  if (!contractAddress) {
    alert("Cannot load poll as address not provided");
    return;
  }

  if (!pollInstance || pollInstance.address != contractAddress) {
    pollInstance = VotingContract.at(contractAddress);
  } else {
    // do nothing as already loaded
  }
}

function updatePollState() {
  for (var i = 0; i < candidates.length; i++) {
    let candidate = candidates[i];
    pollInstance.totalVotesFor.call(candidate.name, function(err, result) {
      if (err) {
        alert("Problem fetching vote count: " + err);
      } else {
        $("#vote_count_" + candidate.id).html(result.toString());
      }
    });
  }
}

function loadPoll() {
  loadPollInstance();
  updatePollState();
}

function voteForCandidate(_candidateId) {
  if (!pollInstance) loadPoll();;

  // validation
  const voterIdentity = $("#voter_identity").val();
  if (!voterIdentity){
    alert("You need to enter your identity/public key")
    return
  }

  // find candidate details using id
  const candidate = candidates.find(item => {
    return item.id === _candidateId
  })

  // action vote
  pollInstance.voteForCandidate(
    candidate.name,
    { from: voterIdentity },
    function() { updatePollState() });
}

function createVotesTable() {
  for (let i = 0; i < candidates.length; i++) {
    let candidate = candidates[i];
    $("#voting-table").append(
      '<tr>' +
        '<td id="candidate_' + candidate.id  + '">' + candidate.name + '</td>' +
        '<td id="vote_count_' + candidate.id + '"></td>'+
        '<td class="vote_button_container">' +
          '<a id="vote_button_' + candidate.id + '" href="#" class="vote_button btn btn-primary">Vote</a>' +
        '</td>' +
      '</tr>')
  }
}

function listenForVote() {
  $(document).ready(function() {
    $('.vote_button').click(function() {
      const candidateId = $(this)[0].id.replace("vote_button_", "")
      voteForCandidate(candidateId)
    });
  });
}

$(document).ready(function() {
  createVotesTable();
  loadPoll();
  listenForVote();
});
