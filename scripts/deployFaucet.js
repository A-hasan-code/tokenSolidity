const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const Faucet = await hre.ethers.getContractFactory("Faucet");

  // Deploy the contract with the constructor argument
  const faucet = await Faucet.deploy("0x9C47aa5e29b31427E670B58BC585B4840F57df56");

  // Wait for the contract to be deployed
  await faucet.waitForDeployment();

  // Get the contract address
  const faucetAddress = await faucet.getAddress();

  console.log("Faucet contract deployed to:", faucetAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});