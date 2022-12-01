// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Contract_64 {
    struct Order {
        address orderAddress;
        address buyer;
        address seller;
        uint totalInvoice;
        uint quantity;
        uint dueDate;
        string productName;
        order_status status;
    }
    enum order_status {
        NEW,
        DELIVERIED,
        CANCELLED
    }
    address public buyerAddress = 0xA379C7bE997Be6C3747240Dcb28eBB7dD27935DD;
    address public sellerAddress = 0x9E2Bb416042381BEdb4F366486D81d00e0895eb7;
    string public productName = "bom kim tiem vinahancook loai 20 ml";
    uint public quantity = 2;
    uint public totalInvoice = 4;
    uint public dueDate = block.timestamp + 2 weeks;
    order_status public status = order_status.NEW;


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
                dueDate,
                productName,
                status
            );
    }

    function changeStatus(order_status _status) public {
        status = _status;
    }
}
