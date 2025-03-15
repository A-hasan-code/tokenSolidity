const hre = require("hardhat");

async function main() {
  // Start the timer
  console.time("Deployment Time");

  // Get the contract factory
  console.log("Getting contract factory...");
  const FlashUsdt = await hre.ethers.getContractFactory("Usdt");

  // Deploy the contract
  console.log("Deploying contract...");
  const usdtflash = await FlashUsdt.deploy();

  // Wait for the contract to be deployed
  console.log("Waiting for deployment confirmation...");
  await usdtflash.waitForDeployment();
console.log("come on next step")
  // Get the address of the deployed contract
  const contractAddress = await usdtflash.getAddress();

  // Log the address of the deployed contract
  console.log("Token deployed to:", contractAddress);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});