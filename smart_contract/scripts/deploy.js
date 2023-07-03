// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const hre = require("hardhat");

const main = async () => {
  // get the contract to deploy
  const Transactions = await hre.ethers.getContractFactory('Transactions');

  console.log('Deploying Transactions...');

  const transactions = await Transactions.deploy();
  await transactions.deployed();

  console.log('Transactions deployed to address:', transactions.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

// const runMain = async () => {
//   try {
//     main();
//     process.exitCode = 0;
//   } catch (error) {
//     console.error(error);
//     process.exitCode = 1;
//   }
// }

// runMain();
