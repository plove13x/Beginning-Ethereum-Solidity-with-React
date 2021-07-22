const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { abi,bytecode } = require('./compile');

const provider = new HDWalletProvider(
	'squeeze bachelor cruise inform quit fame seven ribbon hospital drum tide stomach', 
	'https://rinkeby.infura.io/v3/1c7e1aa58e4740578bf6ed015576d742'
);

const web3 = new Web3(provider);

console.log(typeof abi);

const deploy = async () => {
	console.log('yo');
	accounts = await web3.eth.getAccounts();
	console.log(accounts);
	console.log('attempting to deploy from account', accounts[0]);
	const result = await new web3.eth.Contract(abi)
		.deploy({data: bytecode})
		.send({gas: '1000000', from: accounts[0] });

	console.log(abi);
	console.log('Contract deployed to', result.options.address);
}

deploy();
