// for localhost and hardhat
const {
  developmentChains,
  DECIMALS,
  INITIAL_VALUE
} = require("../helper-hardhat-config");
const { network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  // Don't want to deploy to a Testnet or Mainnet
  if (developmentChains.includes(network.name)) {
    log("Local network detected! Deploying mocks..");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_VALUE]
    });
    log("Mocks deployed!");
    log("-----------------------------------------------");
  }
};

module.exports.tags = ["all", "mocks"];
