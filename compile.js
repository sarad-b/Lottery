const fs = require('fs');
const path = require('path');
const solc = require('solc');

const filePath = path.resolve(__dirname, "contracts","contract.sol");
const data = fs.readFileSync(filePath,'utf8');
var solcInput = {
    language: "Solidity",
    sources: {
        contract: {
            content: data
        }
     },
    settings: {
        optimizer: {
            enabled: true
        },
        evmVersion: "byzantium",
        outputSelection: {
            "*": {
              "": [
                "legacyAST",
                "ast"
              ],
              "*": [
                "abi",
                "evm.bytecode.object",
                "evm.bytecode.sourceMap",
                "evm.deployedBytecode.object",
                "evm.deployedBytecode.sourceMap",
                "evm.gasEstimates"
              ]
            },
        }
    }
};

solcInput = JSON.stringify(solcInput);
var contractString = solc.compile(solcInput);
//console.log(contractString);
var contractObject = JSON.parse(contractString);
//console.log(contractObject.contracts.contract.Contract);
const interface = contractObject.contracts.contract.Contract.abi;
const byteCode = contractObject.contracts.contract.Contract.evm.bytecode.object;
//console.log(interface);
//console.log("********");
//console.log(byteCode);
module.exports= {byteCode,interface};
