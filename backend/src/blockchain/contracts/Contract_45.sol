// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Contract_45 {
    struct Order {
        address orderAddress;
        address buyer;
        address seller;
        uint256 totalInvoice;
        uint256 quantity;
        string productName;
    }
    address public buyerAddress = 0x95a98dcC5Dbff4Ea446986Ee57a93243A7457788;
    address public sellerAddress = 0xf0DbD9E679a18Aa3498a5aC002d21832360d5a8E;
    string public productName = "bom kim tiem vinahancook loai 20 ml";
    uint256 public quantity = 1;
    uint256 public totalInvoice = 100000;

    function deposit() external payable {}

    function withdraw(address payable _to, uint256 _amount) external {
        _to.transfer(_amount);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getAddress() public view returns (address) {
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
