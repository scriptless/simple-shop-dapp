pragma solidity >=0.7.0 <0.9.0;

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

    function createOrder(
        uint itemId,
        uint amount,
        uint finalCost,
        address userAddress
    ) public onlyOwner returns(uint) {
        orders[orderIdCounter] = Shared.Order(1, itemId, amount, finalCost, userAddress, block.timestamp);
        orderIndexes.push(orderIdCounter);
        emit CreateOrder(orderIdCounter);
        return orderIdCounter++;
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
        emit EditShopItem(id);
    }
}


/* Commands

let auth = await Authentication.deployed()
auth.register("Alexander Korfken", "Bonner Allee", 12, 53111, "Bonn")
auth.isUser()
let shop = await ManageShop.deployed()
shop.addShopItem("Hausschuhe", "Beschreibung für Hausschuhe", 5, 10)
let hausschuhe = await shop.shopItems(1)
hausschuhe.description
*/