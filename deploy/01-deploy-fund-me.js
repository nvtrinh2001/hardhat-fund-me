// async function deployFunc(hre) {
//     hre.getNameAccounts()
//     hre.deployments
// }

// module.exports.default = deployFunc;

const { networkConfig } = require("../helper-hardhat-config");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  let ethUsdPriceFeedAddress;

  // if chainId X uses address A
  // if chainId Y uses address B
  if (chainId == 31337) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }

  // If the contract doesn't exist, we deploy a minimal version for local testing

  // what happens if we want to change chains?
  // when going for localhost or hardhat network, we want to use a mock
  const args = [ethUsdPriceFeedAddress /* address */];
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args, // put priceFeed address
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1
  });

  if (chainId != 31337 && process.env.ETHERSCAN_API) {
    await verify(fundMe.address, args);
  }
  log("-----------------------------------------------");
};

module.exports.tags = ["all", "fundme"];
