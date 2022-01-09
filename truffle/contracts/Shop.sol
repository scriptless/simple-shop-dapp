pragma solidity >=0.7.0 <0.9.0;

import "./ManageShop.sol";

contract Shop is ManageShop {

    event BoughtItem(uint itemId, uint amount, uint cost, address userAddress);

    function buy(uint itemId, uint amount, Shared.UserData memory userData) public payable greaterThanZero(amount) {
        Shared.ShopItem memory item = shopItems[itemId];
        require(item.flag == 1, "There is no such shop item");
        require(item.inventory >= amount, "There is not enough in the inventory");

        uint finalCost = item.cost * amount;
        require(msg.value == finalCost, "You need to send the exact amount of wei");
        payable(msg.sender).transfer(finalCost);

        item.inventory -= amount;
        shopItems[itemId] = item;

        emit BoughtItem(itemId, amount, finalCost, msg.sender);
        ManageShop.createOrder(itemId, amount, finalCost, msg.sender, userData);
    }
}