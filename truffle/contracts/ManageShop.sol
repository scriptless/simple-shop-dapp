pragma solidity ^0.8.0;

import "./Authentication.sol";

contract ManageShop is Authentication {

    uint public idCounter = 1;
    uint public orderIdCounter = 1;
    mapping(uint => Shared.Order) public orders;
    mapping(uint => Shared.ShopItem) public shopItems;
    uint[] public orderIndexes;
    uint[] public shopItemIndexes;

    event AddShopItem(uint id);
    event DeleteShopItem(uint id);
    event EditShopItem(uint id);
    event CreateOrder(uint id);
    event DeleteOrder(uint id);

    modifier cantBeNegative(uint number) {
        require(number >= 0, "Number cant be negative");
        _;
    }

    modifier greaterThanZero(uint number) {
        require(number > 0, "Number must be greater than 0");
        _;
    }

    function getOrderCount() public view returns(uint count) {
        return orderIndexes.length;
    }

    function getShopItemCount() public view returns(uint count) {
        return shopItemIndexes.length;
    }

    function createOrder(
        uint itemId,
        uint amount,
        uint finalCost,
        address userAddress,
        Shared.UserData memory userData
    ) internal returns(uint) {
        orders[orderIdCounter] = Shared.Order(1, itemId, amount, finalCost, userAddress, block.timestamp, userData);
        orderIndexes.push(orderIdCounter);
        emit CreateOrder(orderIdCounter);
        return orderIdCounter++;
    }

    function getOrder(uint id) public view returns(uint, uint, uint, address, uint, Shared.UserData memory userData) {
        Shared.Order memory order = orders[id];
        require(order.flag == 1, "There is no such order");
        return (order.itemId, order.amount, order.finalCost, order.userAddress, order.orderTime, order.userData);
    }

    function deleteOrder(uint orderId) public onlyOwner {
        Shared.Order memory order = orders[orderId];
        require(order.flag == 1, "There is no such order");
        order.flag = 0;
        delete orders[orderId];

        uint index = 0;
        for(index = 0; index < orderIndexes.length; index++) {
            if(orderIndexes[index] == orderId) break;
        }
        while(index < orderIndexes.length - 1) {
            orderIndexes[index] = orderIndexes[index+1];
            index++;
        }
        orderIndexes.pop();
        emit DeleteOrder(orderId);
    }

    function addShopItem(
        string memory title,
        string memory description,
        uint cost,
        uint inventory
    ) public onlyOwner cantBeNegative(cost) cantBeNegative(inventory) returns(uint) {
        shopItems[idCounter] = Shared.ShopItem(1, idCounter, title, description, cost, inventory);
        shopItemIndexes.push(idCounter);
        emit AddShopItem(idCounter);
        return idCounter++;
    }

    function deleteShopItem(uint id) public onlyOwner {
        Shared.ShopItem memory item = shopItems[id];
        require(item.flag == 1, "There is no such shop item");
        item.flag = 0;
        delete shopItems[id];

        uint index = 0;
        for(index = 0; index < shopItemIndexes.length; index++) {
            if(shopItemIndexes[index] == id) break;
        }
        while(index < shopItemIndexes.length - 1) {
            shopItemIndexes[index] = shopItemIndexes[index+1];
            index++;
        }
        shopItemIndexes.pop();
        emit DeleteShopItem(id);
    }

    function getShopItem(uint id) public view returns(string memory, string memory, uint, uint) {
        Shared.ShopItem memory item = shopItems[id];
        require(item.flag == 1, "There is no such shop item");
        return (item.title, item.description, item.cost, item.inventory);
    }

    function editShopItem(
        uint id,
        string memory title,
        string memory description,
        uint cost,
        uint inventory
    ) public onlyOwner cantBeNegative(cost) cantBeNegative(inventory) {
        Shared.ShopItem memory item = shopItems[id];
        require(item.flag == 1, "There is no such shop item");
        item.title = title;
        item.description = description;
        item.cost = cost;
        item.inventory = inventory;
        shopItems[id] = item;
        emit EditShopItem(id);
    }
}