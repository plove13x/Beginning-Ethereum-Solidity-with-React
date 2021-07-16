// OUTDATED
// const path = require('path');
// const greetingsPath = path.resolve(__dirname,'contracts','Greetings.sol');

// const fs = require('fs');
// const solc = require('solc');

// const source = fs.readFileSync(greetingsPath, 'utf8');

// (WRONG NOW)
// console.log(solc.compile(source,1));
// module.exports = solc.compile(source, 1).contracts[':Greetings'];



// console.log(solc.compile(JSON.stringify(input)));
// BETTER
// console.log (exports.abi);
// console.log (exports.bytecode);


// JUST A GUESS. PAGE 37 MAKE COMPILER ACCESSIBLE TO OTHER FILES...
// module.exports = output.contracts;


const path = require('path'); 
const fs = require('fs');
const solc = require('solc');

const greetingsPath = path.resolve(__dirname,'contracts','Greetings.sol');

const source = fs.readFileSync(greetingsPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'Greetings.sol' : {
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

exports.abi = output.contracts['Greetings.sol']['Greetings'].abi;
exports.bytecode = output.contracts['Greetings.sol']['Greetings'].evm.bytecode.object;
