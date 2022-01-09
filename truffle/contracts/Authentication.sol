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

    struct Order {
        uint flag;
        uint itemId;
        uint amount;
        uint finalCost;
        address userAddress;
        uint orderTime;
    }
}

contract Authentication {

  address payable public owner = payable(msg.sender);
  mapping(address => Shared.User) public users;

  event Registration(address userAddress);

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
      require(!isUser(), "You are already registered");
      users[msg.sender] = Shared.User(1, msg.sender, name, street, number, postal, city, isOwner());

      emit Registration(msg.sender);
  }
}