// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat');

async function main() {
  const AirToken = await hre.ethers.getContractFactory('AirToken');
  const airtoken = await AirToken.deploy(
      '0x1d2c6d0de38c77d2a15f6d241121ec032404625e87566d8a742d3dc2f924263d',
  );

  await airtoken.deployed();
  console.log(`AirToken is deployed to  ${airtoken.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
