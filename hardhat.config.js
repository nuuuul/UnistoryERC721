require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()
require('@nomicfoundation/hardhat-ignition-ethers')
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: '0.8.27',
	networks: {
		sepolia: {
			// chainId: 11155111,
			accounts: [process.env.PRIVATE_KEY],
			url: process.env.RPC_URL,
		},
	},
}
