// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {


 

  const AirToken = await hre.ethers.getContractFactory("AirToken");
  const airtoken = await AirToken.deploy();

  await airtoken.deployed();
  console.log(`AirToken is deployed to  ${airtoken.address}`);
 
  const addAddress=await airtoken.addWhiteListAddress("0x70997970C51812dc3A010C7d01b50e0d17dc79C8",2000);
  console.log("White list address added");

  const addAddress2=await airtoken.addWhiteListAddress("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",4000);
  console.log("White list address added");

  //const claimToken=await airtoken.claim("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
  //console.log(`Token claimed`)

  
  //let funds=await airtoken.balanceOf("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
  //console.log(`Wallet fund ${funds}`);




}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
