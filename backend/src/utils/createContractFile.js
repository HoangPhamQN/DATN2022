const createContractFile = (body) => {
    const fs = require('fs');
    const dir = './src/blockchain/contracts';
    let { name, quantity, unitPrice, slug, buyerAddress, sellerAddress, id } = body;
    let totalInvoice = unitPrice * quantity;
    console.log(1111, slug)

    const totalContract = fs.readdirSync(dir).length
    const nameOverided = slug.replaceAll('-', ' ')

    const content =
        `// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Contract_${totalContract} {
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
    address public buyerAddress = ${buyerAddress};
    address public sellerAddress = ${sellerAddress};
    string public productName = "${nameOverided}";
    string public id = "${id}";
    uint public quantity = ${quantity};
    uint public totalInvoice = ${totalInvoice};
    uint256 public dueDate = block.timestamp + 2 weeks;
    order_status public status = order_status.NEW;

    event Deposit(address indexed _from, uint _value);
    function deposit() external payable {
        emit Deposit(msg.sender, msg.value);
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
`;
    let fileName = `Contract_${totalContract}.sol`
    fs.writeFile(`./src/blockchain/contracts/${fileName}`, content, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });

    return fileName;

}

module.exports = {
    createContractFile
}