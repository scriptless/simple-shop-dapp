const Authentication = artifacts.require("Authentication");
const ManageShop = artifacts.require("ManageShop");

module.exports = function(deployer) {
    deployer.deploy(Authentication);
    deployer.deploy(ManageShop);
};