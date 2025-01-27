// SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

contract SimpleStorage {
    uint256 private storedValue;
    string private storedString;

    function set(uint256 _value) public {
        storedValue = _value;
    }

    function setString(string memory _value) public {
        storedString = _value;
    }

    function get() public view returns (uint256) {
        return storedValue;
    }

    function setString() public view returns (string memory) {
        return storedString;
    }
}