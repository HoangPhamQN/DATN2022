// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Contract_62 {
    struct Order {
        address orderAddress;
        address buyer;
        address seller;
        uint256 totalInvoice;
        uint256 quantity;
        string productName;
    }
    address public buyerAddress = 0xA379C7bE997Be6C3747240Dcb28eBB7dD27935DD;
    address public sellerAddress = 0xf0DbD9E679a18Aa3498a5aC002d21832360d5a8E;
    string public productName = "bom kim tiem vinahancook loai 20 ml";
    uint public quantity = 2;
    uint public totalInvoice = 4;


    function deposit() external payable {
    }

    function withdraw(address payable _to, uint _amount) external {
        _to.transfer(_amount);
    }

    function getBalance() external view returns(uint) {
        return address(this).balance;
    }

    function getAddress() public view returns(address) {
        return address(this);
    }

    function getOrder() public view returns (Order memory) {
        return
            Order(
                getAddress(),
                buyerAddress,
                sellerAddress,
                totalInvoice,
                quantity,
                productName
            );
    }
}
