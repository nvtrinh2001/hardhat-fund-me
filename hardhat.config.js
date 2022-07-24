require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");
require("solidity-coverage");
require("@nomicfoundation/hardhat-chai-matchers");

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "https://eth-rinkeby";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
const ETHERSCAN_API = process.env.ETHERSCAN_API || "key";
const COINMARKETCAP_API = process.env.COINMARKETCAP_API || "key";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: { compilers: [{ version: "0.8.9" }, { version: "0.6.6" }] },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337
    },
    rinkeby: {
      accounts: [PRIVATE_KEY],
      url: RINKEBY_RPC_URL || "key",
      chainId: 4,
      blockConfirmations: 6
    }
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API
    // token: "MATIC"
  },
  etherscan: {
    apiKey: ETHERSCAN_API || "key"
  },
  namedAccounts: {
    deployer: {
      // take the first account of the network to work with
      default: 0
    },
    users: {
      default: 1
    }
  }
};
