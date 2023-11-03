const { ethers } = require("hardhat");
// import dotenv from "dotenv";
const dotenv = require("dotenv")
dotenv.config();

async function main() {
  const fee = 15; // 1% fee
  const feeAddress = process.env.FEE_ADDRESS;

  const args = [feeAddress, fee]

  const offlink = await ethers.deployContract("OffLink", [feeAddress, fee]);

  await offlink.waitForDeployment();

  console.log(`deployed to ${offlink.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
