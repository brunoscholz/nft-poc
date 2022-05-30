// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

contract supplyChain {
  uint32 public product_id = 0;
  uint32 public participant_id = 0;
  uint32 public owner_id = 0;

  struct product {
    string uri;
    address owner;
    uint32 cost;
    uint32 timestamp;
  }

  struct participant {
    string username;
    string password;
    string participantType;
    address account;
  }

  struct ownership {
    uint32 productId;
    uint32 ownerId;
    uint32 timestamp;
    address owner;
  }

  mapping(uint32 => product) public products;
  mapping(uint32 => participant) public participants;

  mapping(uint32 => ownership) public ownerships; // ownerships by ownership ID
  mapping(uint32 => uint32[]) public productTrack; // ownerships by product ID

  event TransferOwnership(uint32 productId);

  function addParticipant(string memory _name, string memory _pass, address _address, string memory _type) public returns (uint32) {
    uint32 userId = participant_id++;
    participants[userId].username = _name;
    participants[userId].password = _pass;
    participants[userId].participantType = _type;
    participants[userId].account = _address;

    return userId;
  }

  function getParticipant(uint32 _id) public view returns (string memory, address, string memory) {
    return (participants[_id].username, participants[_id].account, participants[_id].participantType);
  }

  function addProduct(uint32 _ownerId) public returns(uint32) {
    if (keccak256(abi.encodePacked(participants[_ownerId].participantType)) == keccak256("Manufacturer")) {
      uint32 productId = product_id++;

      products[productId].owner = participants[_ownerId].account;
      products[productId].timestamp = uint32(block.timestamp);

      return product_id;
    }

    return 0;
  }

  modifier onlyOwner(uint32 _id) {
    require(msg.sender == products[_id].owner);
    _;
  }

  function getProduct(uint32 _productId) public view returns (string memory,uint32,address,uint32) {
      // products[_productId].partNumber,
      // products[_productId].serialNumber,
    return (products[_productId].uri, products[_productId].cost, products[_productId].owner, products[_productId].timestamp);
  }

  function newOwner(uint32 _user1Id,uint32 _user2Id, uint32 _prodId) onlyOwner(_prodId) public returns (bool) {
    participant memory p1 = participants[_user1Id];
    participant memory p2 = participants[_user2Id];
    uint32 ownership_id = owner_id++;

    if(keccak256(abi.encodePacked(p1.participantType)) == keccak256("Manufacturer") && keccak256(abi.encodePacked(p2.participantType))==keccak256("Supplier")) {
      ownerships[ownership_id].productId = _prodId;
      ownerships[ownership_id].owner = p2.account;
      ownerships[ownership_id].ownerId = _user2Id;
      ownerships[ownership_id].timestamp = uint32(block.timestamp);
      products[_prodId].owner = p2.account;
      productTrack[_prodId].push(ownership_id);
      emit TransferOwnership(_prodId);

      return (true);
    }
    else if(keccak256(abi.encodePacked(p1.participantType)) == keccak256("Supplier") && keccak256(abi.encodePacked(p2.participantType))==keccak256("Supplier")) {
      ownerships[ownership_id].productId = _prodId;
      ownerships[ownership_id].owner = p2.account;
      ownerships[ownership_id].ownerId = _user2Id;
      ownerships[ownership_id].timestamp = uint32(block.timestamp);
      products[_prodId].owner = p2.account;
      productTrack[_prodId].push(ownership_id);
      emit TransferOwnership(_prodId);

      return (true);
    }
    else if(keccak256(abi.encodePacked(p1.participantType)) == keccak256("Supplier") && keccak256(abi.encodePacked(p2.participantType))==keccak256("Consumer")) {
      ownerships[ownership_id].productId = _prodId;
      ownerships[ownership_id].owner = p2.account;
      ownerships[ownership_id].ownerId = _user2Id;
      ownerships[ownership_id].timestamp = uint32(block.timestamp);
      products[_prodId].owner = p2.account;
      productTrack[_prodId].push(ownership_id);
      emit TransferOwnership(_prodId);

      return (true);
    }

    return (false);
  }

  function getProvenance(uint32 _prodId) external view returns (uint32[] memory) {
    return productTrack[_prodId];
  }

  function getOwnership(uint32 _regId)  public view returns (uint32,uint32,address,uint32) {
    ownership memory r = ownerships[_regId];
    return (r.productId,r.ownerId,r.owner,r.timestamp);
  }

  function authenticateParticipant(uint32 _uid, string memory _uname, string memory _pass, string memory _utype) public view returns (bool) {
    if(keccak256(abi.encodePacked(participants[_uid].participantType)) == keccak256(abi.encodePacked(_utype))) {
      if(keccak256(abi.encodePacked(participants[_uid].username)) == keccak256(abi.encodePacked(_uname))) {
        if(keccak256(abi.encodePacked(participants[_uid].password)) == keccak256(abi.encodePacked(_pass))) {
          return (true);
        }
      }
    }

    return (false);
  }
}