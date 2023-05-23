require("@nomicfoundation/hardhat-toolbox");

const URL = 'https://eth-sepolia.g.alchemy.com/v2/iCw3KGcHpwaapQoJsb9IA4d20iTaYjzL'
const Pk = ''
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    sepolia: {
      url: URL,
      accounts: [Pk]
    }
  },
  paths: {
    artifacts: "./src/artifacts"
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
};
