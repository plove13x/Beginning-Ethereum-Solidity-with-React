pragma Solidity ^0.8.4

contract EBayClone {
	struct Product {
		uint id;
		address seller;
		address buyer;
		string name;
		string description;
		uint price;
	}

	uint productCounter;
	mapping (uint => Product) public products;

	function sellProduct(string _name, string description, uint _price) public {
		Product memory newProduct = Product({
			id: productCounter,
			seller: msg.sender,
			buyer: 0x0,
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
		require(product.buyer == 0x0);
		require(msg.sender != product.seller);
		require(msg.value == product.price);
		product.buyer = msg.sender;
		product.seller.transfer(msg.value);
	}
}