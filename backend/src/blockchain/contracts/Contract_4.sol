// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Contract_4 {
    string public name = "bom kim tiem vinahancook loai 20 ml";
    uint256 public quantity = 5;
    uint256 public unitPrice = 100000;

    function deposit() external payable {}

    function withdraw(address payable _to, uint256 _amount) external {
        _to.transfer(_amount);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getAddress() external view returns (address) {
        return address(this);
    }
}
