const deployContract = async (fileName, walletAddress, buyerId) => {
    const { UserContract } = require('../models')
    // solc compiler
    const solc = require("solc");


    // file reader
    const fs = require("fs");

    // Creation of Web3 class
    const Web3 = require("web3");

    // Setting up a HttpProvider
    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    // Reading the file
    fs.readFile(`./src/blockchain/contracts/${fileName}`, 'utf8', (err, data) => {
        if (err) {
            console.log("Error: ", err)
        }

        let file = data.toString();
        // input structure for solidity compiler
        var input = {
            language: "Solidity",
            sources: {
                contract: {
                    content: file,
                },
            },

            settings: {
                outputSelection: {
                    "*": {
                        "*": ["*"],
                    },
                },
            },
        };

        var output = JSON.parse(solc.compile(JSON.stringify(input)));
        // console.log("Result : ", output);

        ABI = output.contracts['contract'][`${fileName}`.slice(0, -4)].abi;
        bytecode = output.contracts['contract'][`${fileName}`.slice(0, -4)].evm.bytecode.object;
        // console.log("Bytecode: ", bytecode);
        console.log("ABI: ", ABI);


        contract = new web3.eth.Contract(ABI);
        mainAccount = walletAddress;
        contract
            .deploy({ data: bytecode })
            .send({ from: mainAccount, gas: 470000 })
            .on("receipt", async (receipt) => {
                // Contract Address will be returned here
                console.log("Deployed Contract Address:", receipt.contractAddress);
                await UserContract.create({
                    userId: buyerId,
                    abi: ABI,
                    contractAddress: receipt.contractAddress
                })
            })
    });
}


module.exports = {
    deployContract
}