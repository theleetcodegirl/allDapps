// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Lottery {
    address public manager;
    address[] public participants;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);
        participants.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participants)));
    }

    function pickWinner() public restricted {
        uint index = random() % participants.length;
        payable(participants[index]).transfer(address(this).balance);
        participants = new address[](0);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getParticipants() public view returns (address[] memory) {
        return participants;
    }
}

