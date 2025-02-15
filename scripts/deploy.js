const hre = require("hardhat");

async function main() {
  const USDTFlashToken = await hre.ethers.getContractFactory("USDTFlashToken");
  const usdtflash = await USDTFlashToken.deploy(100000000, 50);

  await usdtflash .deployed();

  console.log("Ocean Token deployed: ", USDTFlashToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
