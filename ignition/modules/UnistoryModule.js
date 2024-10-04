async function main() {
	const UnistoryNFT = await ethers.getContractFactory('UnistoryNFT')
	const unistoryNFT = await UnistoryNFT.deploy(100n)

	console.log('NFT Contract Deployed at ' + unistoryNFT.target)
}

main().catch(error => {
	console.error(error)
	process.exitCode = 1
})

// const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules')

// // const ONE_GWEI = 1_000_000_000n
// const MAX_TOKEN_SUPPLY = 100
// module.exports = buildModule('UnistoryModule', m => {
// 	// const lockedAmount = m.getParameter('lockedAmount', ONE_GWEI)
// 	const tokenSupply = m.getParameter('tokenSupply', MAX_TOKEN_SUPPLY)
// 	const unistoryNFT = m.contract('UnistoryNFT', [tokenSupply])

// 	return { unistoryNFT }
// })
