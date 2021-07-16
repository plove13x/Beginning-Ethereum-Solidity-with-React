pragma solidity ^0.8.4;
// NOT IN USE JUST STH TO LOOK AT MAYBE: pragma experimental ABIEncoderV2;

contract EBayClone {
     
    address payable public owner;
  
    // constructor() payable {
    //     owner = payable(msg.sender);
    // } 
    
	struct Product {
		uint id;
		address payable seller;
		address buyer;
		string name;
		string description;
		uint price;
	}

	uint productCounter;
	mapping (uint => Product) public products;

                                //callData?
	function sellProduct(string memory _name, string memory _description, uint _price) public {
		
		Product memory newProduct = Product({
			id: productCounter,
			seller: msg.sender,
			buyer: address(0),
			name: _name,
			description: _description,
			price: _price
		});

		products[productCounter] = newProduct;
		productCounter++;
	}

	function getNumberOfProducts() public view returns (uint) {
		return productCounter;
	}

	function buyProduct (uint _id) payable public{
		Product storage product = products[_id];
		require(product.buyer == address(0));
		require(msg.sender != product.seller);
		require(msg.value == product.price);
		product.buyer = msg.sender;
		product.seller.transfer(msg.value);
	}
}