// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FlashUsdt is ERC20 {
  // Token Properties
  constructor() ERC20("FlashUsdt", "FUSDT") {
    uint8 _decimals = 18;
    _mint(msg.sender, 1000000 * 10**uint256(_decimals));  // Mint total supply to deployer
  }

  // Total Supply Definition
  uint256 public constant TOTAL_SUPPLY = 1000000 * 10**18;

  // Contract Owner
  address public owner;

  // Events
  event Mint(address indexed to, uint256 amount);
  event Burn(address indexed from, uint256 amount);

  // Minting Function with Access Control (only owner)
  function mint(address recipient, uint256 amount) public onlyOwner {
    require(totalSupply() + amount <= TOTAL_SUPPLY, "Minting exceeds total supply");
    _mint(recipient, amount);
    emit Mint(recipient, amount);
  }

  // Burning Function
  function burn(uint256 amount) public {
    _burn(msg.sender, amount);
    emit Burn(msg.sender, amount);
  }

  // Ownership Transfer Function
  function transferOwnership(address newOwner) public onlyOwner {
    owner = newOwner;
  }

  // Modifier to restrict functions to contract owner
  modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can perform this action");
    _;
  }
}
