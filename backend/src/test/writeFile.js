const sample = () => {
    const fs = require('fs');

    const content = `//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {
    uint256 public count = 0;
}
`;

    fs.writeFile('./test/test.sol', content, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });

}

sample()