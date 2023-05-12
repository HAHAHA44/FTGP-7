// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const path = require("path");
const admins = require("../admins.json").admins

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);

  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "src", "artifacts");

  const main = await deployMain();

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Main: main.address }, undefined, 2)
  );
}

async function deployMain() {
  const Main = await hre.ethers.getContractFactory("Main");
  const main = await Main.deploy(admins);

  await main.deployed();

  console.log(
    `main deployed to ${main.address}`
  );

  return main;
}

async function deployBetting() {
  const Betting = await hre.ethers.getContractFactory("Betting");
  const betting = await Betting.deploy();

  await betting.deployed();

  console.log(
    `Betting deployed to ${betting.address}`
  );

  return betting;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
