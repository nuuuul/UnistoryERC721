// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";



contract UnistoryNFT is ERC721, Ownable {
	uint256 private _nextTokenId;
    uint256 public immutable maxTotalSupply;
	uint256 public PRICE = 1000000 wei;

	constructor(uint256 userMaxTotalSupply)
        ERC721("UnistoryNFT", "U")
        Ownable(msg.sender)
    {
		maxTotalSupply = userMaxTotalSupply; 
	}

	function mint(uint amount, address receiver) public payable{
		require(receiver.balance >= PRICE * amount, "Account must have enough eth to mint tokens");
		require(amount <= 3, "You cant mint more then 3 tokens at time");
		require(balanceOf(receiver) + amount <= 6, "Account cant have more then 6 tokens at time");
		require(_nextTokenId + amount < maxTotalSupply, "Token limit exeeded");

		for(uint i=0; i < amount; i++){
			safeMint(receiver);
		}
	}

	function withdraw(uint256 amount, address payable receiver) public onlyOwner{
		require(amount < address(this).balance, string.concat("You cant transfer more then contract have.\nContract balance: ", Strings.toString(address(this).balance)));
		receiver.transfer(amount);
	}


	function _baseURI() internal pure override returns(string memory) {
		return "https://brown-rational-booby-431.mypinata.cloud/ipfs/Qmejgi7LLBaMTEzeADuiNcSqaSuXmqZbbjsNYa7nbwyXXj/";
	}


	function safeMint(address to) private onlyOwner {
	uint256 tokenId = _nextTokenId++;
	_safeMint(to, tokenId);
	}
}