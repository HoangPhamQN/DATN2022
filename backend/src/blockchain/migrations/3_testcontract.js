var TestContract2 = artifacts.require('./TestContract2.sol');

module.exports = function (deployer) {
    deployer.deploy(TestContract2);
};