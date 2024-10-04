const { expect } = require('chai')
const { assert } = require('chai')
const { helpers } = require('chai')
const {
	loadFixture,
} = require('@nomicfoundation/hardhat-toolbox/network-helpers')
const { network } = require('hardhat')

describe('UnistoryNFT contract', function () {
	async function deployContract(maxSupply) {
		const UnistoryNFT = await ethers.getContractFactory('UnistoryNFT')
		const unistoryNFT = await UnistoryNFT.deploy(maxSupply)
		return unistoryNFT
	}
	//Test of maxSupply
	describe('After deployment', function () {
		it('When deployed, maxTokenSupply should be set to 100.', async function () {
			const [owner] = await hre.ethers.getSigners()
			const balance = await ethers.provider.getBalance(owner)
			const unistoryNFT = await deployContract(10)
			const new_balance = await ethers.provider.getBalance(owner)
			console.log('\t', balance - new_balance, ' gas spent on deployment')
			expect(100).to.equal(await unistoryNFT.maxTotalSupply())
		})

		describe('mint function', function () {
			it('Should have thrown an error: "Account must have enough eth to mint tokens"', async function () {
				const unistoryNFT = await deployContract(100)
				const accounts = await hre.ethers.getSigners()
				// seting balance to zero
				await network.provider.send('hardhat_setBalance', [
					accounts[2].address,
					'0x1',
				])

				try {
					await unistoryNFT.mint(2, accounts[2])
					assert.fail('Should have thrown an error')
				} catch (err) {
					assert.include(
						err.message,
						'Account must have enough eth to mint tokens'
					)
				}
			})

			it('Should have thrown an error: "You cant mint more then 3 tokens at time"', async function () {
				const unistoryNFT = await deployContract(100)
				const accounts = await hre.ethers.getSigners()
				//testing requirements
				try {
					await unistoryNFT.mint(6, accounts[1])
					assert.fail('Should have thrown an error')
				} catch (err) {
					assert.include(
						err.message,
						'You cant mint more then 3 tokens at time'
					)
				}
			})

			it('Should have thrown an error: "Account cant have more then 6 tokens at time"', async function () {
				const unistoryNFT = await deployContract(100)
				const accounts = await hre.ethers.getSigners()
				//minting 6 tokens on account to test requirement #3
				await unistoryNFT.mint(3, accounts[1])
				await unistoryNFT.mint(3, accounts[1])

				try {
					await unistoryNFT.mint(1, accounts[1])
					assert.fail('Should have thrown an error')
				} catch (err) {
					assert.include(
						err.message,
						'Account cant have more then 6 tokens at time'
					)
				}
			})
			it('Should have thrown an error: "Token limit exeeded"', async function () {
				const unistoryNFT = await deployContract(1)
				const accounts = await hre.ethers.getSigners()

				try {
					await unistoryNFT.mint(1, accounts[1])
					assert.fail('Should have thrown an error')
				} catch (err) {
					assert.include(err.message, 'Token limit exeeded')
				}
			})

			it('Should mint 3 tokens', async function () {
				const unistoryNFT = await deployContract(100)
				const accounts = await hre.ethers.getSigners()
				await unistoryNFT.mint(3, accounts[3])
				expect(3).to.equal(await unistoryNFT.balanceOf(accounts[3]))
			})
		})

		describe('Withdraw function', function () {
			it('Should have thrown an error: "You cant transfer more then contract have"', async function () {
				const unistoryNFT = await deployContract(100)
				const [owner] = await hre.ethers.getSigners()

				try {
					await unistoryNFT.withdraw(100, owner)
					assert.fail('Should have thrown an error')
				} catch (err) {
					assert.include(
						err.message,
						'You cant transfer more then contract have'
					)
				}
			})

			it('Should transfer ', async function () {
				const unistoryNFT = await deployContract(100)
				const [owner, acc1] = await hre.ethers.getSigners()

				const contractBalance = await ethers.provider.getBalance(unistoryNFT)
				console.log(contractBalance)
				console.log(await ethers.provider.getBalance(owner.address))
				await unistoryNFT.mint(3, acc1)
				console.log(await ethers.provider.getBalance(unistoryNFT))
				console.log(await ethers.provider.getBalance(owner.address))
				console.log(await unistoryNFT.balanceOf(acc1))
				// console.log(await unistoryNFT.balanceOf(acc1))
				// await unistoryNFT.withdraw(1, owner)
				console.log(
					'owner balance',
					await ethers.provider.getBalance(owner.address)
				)
				console.log(
					'ACC1 BALANCE',
					await ethers.provider.getBalance(acc1.address)
				)
			})
		})
	})
})
