// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Contract_42 {
    string public name = "bom kim tiem vinahancook loai 20 ml";
    uint public quantity = 1;
    uint public unitPrice = 100000;

    function deposit() external payable {
    }

    function withdraw(address payable _to, uint _amount) external {
        _to.transfer(_amount);
    }

    function getBalance() external view returns(uint) {
        return address(this).balance;
    }

    function getAddress() external view returns(address) {
        return address(this);
    }
}
