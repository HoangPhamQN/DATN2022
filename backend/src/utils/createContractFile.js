const createContractFile = (body) => {
    const fs = require('fs');
    const dir = './src/blockchain/contracts';
    let { name, quantity, unitPrice, slug } = body;

    const totalContract = fs.readdirSync(dir).length
    const nameOverided = slug.replaceAll('-', ' ')

    const content =
        `// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Contract_${totalContract} {
    string public name = "${nameOverided}";
    uint public quantity = ${quantity};
    uint public unitPrice = ${unitPrice};

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