// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Contract_133 {
    struct Order {
        address orderAddress;
        address buyer;
        address seller;
        uint totalInvoice;
        uint quantity;
        uint256 dueDate;
        string productName;
        string id;
        order_status status;
    }
    enum order_status {
        NEW,
        PROCESSING,
        DELIVERIED,
        CANCELLED,
        COMPLETED
    }
    address public buyerAddress = 0x35f8a083D3cFD923F4cd3760750f857A54C9A24c;
    address public sellerAddress = 0x9E2Bb416042381BEdb4F366486D81d00e0895eb7;
    string public productName = "thuoc aspirin 100";
    string public id = "6386120ebdadff414bbc49c1";
    uint public quantity = 1;
    uint public totalInvoice = 2;
    uint256 public dueDate = block.timestamp + 2 weeks;
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
                id,
                status
            );
    }

    function changeStatus(order_status _status) public {
        status = _status;
    }
}
