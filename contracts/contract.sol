pragma solidity ^0.8.6;

contract Contract{
address public manager;
address payable[] public players;

constructor(){
  manager = msg.sender;
}
function enter() public payable{
    require(msg.value > 0.1 ether);
    players.push(payable(msg.sender));
}

function pickNumber()public {
    address payable winner = players[random()%players.length];
    winner.transfer(address(this).balance);
    players = new address payable[](0);
}

function random() private view returns(uint256){
   return uint256(keccak256(abi.encodePacked(block.difficulty,block.timestamp,players)));
}

}
