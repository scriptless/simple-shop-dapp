pragma solidity >=0.7.0 <0.9.0;

library Shared {

    struct UserData {
        string name;
        string street;
        uint number;
        uint postal;
        string city;
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
        UserData userData;
    }
}

contract Authentication {

  address payable public owner = payable(msg.sender);

  modifier onlyOwner() {
    require(isOwner(), "This function is restricted to the contract's owner");
    _;
  }

  function isOwner() public view returns(bool isOwnerIndeed) {
      return isOwner(msg.sender);
  }

  function isOwner(address checkUser) public view returns(bool isOwnerIndeed) {
      return checkUser == owner;
  }
}