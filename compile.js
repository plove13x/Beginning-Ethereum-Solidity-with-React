const path = require('path'); 
const fs = require('fs');
const solc = require('solc');

const eBayClonePath = path.resolve(__dirname,'contracts','EBayClone.sol');

const source = fs.readFileSync(eBayClonePath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'EBayClone.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

exports.abi = output.contracts['EBayClone.sol']['EBayClone'].abi;
exports.bytecode = output.contracts['EBayClone.sol']['EBayClone'].evm.bytecode.object;
