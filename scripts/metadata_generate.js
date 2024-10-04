//SCRIPT TO GENERATE NFT JSON METADATA
const fs = require('fs')

//attributes
let clothes_trait
let hair_trait
let boots_trait

for (let i = 0; i < 100; i++) {
	//attributes rarity
	let clothes_random = Math.random()
	let hair_random = Math.random()
	let boots_random = Math.random()

	// calculating the rarity of the attributes
	switch (true) {
		case clothes_random <= 0.1:
			clothes_trait = 'Military'
			break
		case clothes_random <= 0.3:
			clothes_trait = 'Empty'
			break
		case clothes_random <= 0.55:
			clothes_trait = 'Suit'
			break
		case clothes_random <= 1:
			clothes_trait = 'Jacket'
	}

	switch (true) {
		case hair_random <= 0.1:
			hair_trait = 'Empty'
			break
		case hair_random <= 0.35:
			hair_trait = 'Mohawk'
			break
		case hair_random <= 0.65:
			hair_trait = 'Fade'
			break
		case hair_random <= 1:
			hair_trait = 'Box'
	}

	switch (true) {
		case boots_random <= 0.1:
			boots_trait = 'New Balance'
			break
		case boots_random <= 0.3:
			boots_trait = 'Adidas'
			break
		case boots_random <= 0.6:
			boots_trait = 'Empty'
			break
		case boots_random <= 1:
			boots_trait = 'Nike'
	}

	//a little construct for the correct external_url
	if (i < 10) {
		i = i.toString()
		i = '0' + i
	}

	//the dict to convert
	metadata = {
		description: 'Just a bear',
		external_url: `https://ipfs.io/ipfs/Qmb8Guy7sL3i3GWKxaP62m98r8FgMQYoxnpapTmotCDzu1/bear-00${i}.png`,
		name: `bear-00${i}`,
		attributes: [
			{
				trait_type: 'Clothes',
				value: clothes_trait,
			},
			{
				trait_type: 'Hair',
				value: hair_trait,
			},
			{
				trait_type: 'Boots',
				value: boots_trait,
			},
		],
	}

	//converting to JSON string
	var data = JSON.stringify(metadata, null, 2)

	// writing the JSON string content to a file
	fs.writeFile(`../metadata/${Number(i)}.json`, data, error => {
		// throwing the error
		// in case of a writing problem
		if (error) {
			// logging the error
			console.error(error)

			throw error
		}

		console.log(`${i}.json written correctly`)
	})
}
