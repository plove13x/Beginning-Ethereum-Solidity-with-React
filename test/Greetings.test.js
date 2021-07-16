const assert = require('assert'); 
const ganache = require('ganache-cli'); 
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

// OLD ASYNC
// beforeEach (() => {
// 	web3.eth.getAccounts()
// 	.then(fetchedAccounts => {
// 		console.log(fetchedAccounts);
// 	});
// });

// console.log(require('../compile'));

const { abi, bytecode } = require('../compile');

// console.log(abi);
// console.log(bytecode);
// console.log(abi[0]);


// describe('Greetings',() => {
// 	it('dummy test', () => {

// 	});
// });


let accounts;
let greetings;
console.log(abi);
// NEW ASYNC
beforeEach(async () => {
	accounts = await web3.eth.getAccounts();
	// console.log(accounts);
	// console.log(abi);
	greetings = await new web3.eth.Contract(abi)
	.deploy({ data: bytecode , arguments: ['Hello World'] })
	.send({from: accounts[0], gas:'1000000'})
});

describe('Greetings',() => {
	it('deploys a greetings contract', () => {
		// console.log(greetings);
		assert.ok(greetings.options.address);
	});
	it('has a default message', async () => {
		const message = await greetings.methods.message().call();
		assert.equal(message, 'Hello World')
	});
	it('can change the message', async () => {
		await greetings.methods.setMessage('Hello Avengers').send({ from: accounts[0] } )
		const message = await greetings.methods.message().call();
		assert.equal(message,'Hello Avengers');
	});
});
