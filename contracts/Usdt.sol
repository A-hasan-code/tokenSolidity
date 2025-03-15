// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Usdt is ERC20 {
  // Token Properties
  constructor() ERC20("Usdt", "USDT") {
    uint8 _decimals = 18;
    _mint(msg.sender, 1000000 * 10**uint256(_decimals));  
  }

  // Total Supply Definition
  uint256 public constant TOTAL_SUPPLY = 1000000 * 10**18;

  // Events
  event Mint(address indexed to, uint256 amount);
  event Burn(address indexed from, uint256 amount);

  // Minting Function with no Access Control (public)
  function mint(address recipient, uint256 amount) public {
    require(totalSupply() + amount <= TOTAL_SUPPLY, "Minting exceeds total supply");
    _mint(recipient, amount);
    emit Mint(recipient, amount);
  }

  // Burning Function
  function burn(uint256 amount) public {
    _burn(msg.sender, amount);
    emit Burn(msg.sender, amount);
  }
}
