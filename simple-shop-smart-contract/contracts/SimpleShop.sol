pragma solidity >=0.7.0 <0.9.0;

library Shared {
    struct User {
        uint flag;
        address userAddress;
        string name;
        string street;
        uint number;
        uint postal;
        string city;
        bool isOwner;
    }

    struct ShopItem {
        uint flag;
        uint id;
        string title;
        string description;
        uint cost;
        uint inventory;
    }
}

contract Authentication {

  address public owner = msg.sender;
  mapping(address => Shared.User) public users;

  modifier onlyOwner() {
    require(isOwner(), "This function is restricted to the contract's owner");
    _;
  }

  modifier onlyUser() {
      require(isUser(), "You need to register first");
      _;
  }

  function isOwner() public view returns(bool isOwnerIndeed) {
      return isOwner(msg.sender);
  }

  function isOwner(address checkUser) public view returns(bool isOwnerIndeed) {
      return checkUser == owner;
  }

  function isUser() public view returns(bool isUserIndeed) {
      return isUser(msg.sender);
  }

  function isUser(address checkUser) public view returns(bool isUserIndeed) {
      return users[checkUser].flag == 1;
  }

  function register(
      string memory name,
      string memory street,
      uint number,
      uint postal,
      string memory city
  ) public {
      //require(!isUser(), "You are already registered");
      users[msg.sender] = Shared.User(1, msg.sender, name, street, number, postal, city, isOwner());
  }
}

contract ManageShop is Authentication {

    uint public idCounter = 1;
    mapping(uint => Shared.ShopItem) public shopItems;
    uint[] public shopItemIndexes;

    function addShopItem(
        string memory title,
        string memory description,
        uint cost,
        uint inventory
    ) public onlyOwner {
        shopItems[idCounter] = Shared.ShopItem(1, idCounter, title, description, cost, inventory);
        shopItemIndexes.push(idCounter);
        idCounter++;
    }

    /*function getShopItems() public view returns(ShopItem[] memory) {
        ShopItem[] storage items;
        for(uint i = 0; i < (idCounter - 1); i++) {
            ShopItem memory item = shopItems[shopItemIndexes[i]];
            if(item.flag == 1) {
                items.push(item);
            }
        }
        return items;
    }*/
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