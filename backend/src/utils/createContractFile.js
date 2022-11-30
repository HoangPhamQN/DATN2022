const createContractFile = (body) => {
    const fs = require('fs');
    const dir = './src/blockchain/contracts';
    let { name, quantity, unitPrice, slug, buyerAddress, sellerAddress } = body;
    let totalInvoice = unitPrice * quantity;

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
        uint256 totalInvoice;
        uint256 quantity;
        string productName;
    }
    address public buyerAddress = ${buyerAddress};
    address public sellerAddress = ${sellerAddress};
    string public productName = "${nameOverided}";
    uint public quantity = ${quantity};
    uint public totalInvoice = ${totalInvoice};


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