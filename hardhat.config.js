require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks:{
    sepolia: {
      chainId: 11155111,
      url: process.env.Alchemy_sepolia_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY]
    }}
};
