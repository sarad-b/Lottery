const Web3 = require('web3');
const ganache = require('ganache-cli');
const data= require('../compile.js')
const bytecode = data['byteCode'];
const interface = JSON.stringify(data['interface']);
//console.log(bytecode);
//console.log(interface);
const web3 = new Web3(ganache.provider());
let accounts;
let deployedContract;

let balance;

const printBalances = async () =>{

  for (var i = 0; i < accounts.length; i++) {
    balance = await web3.eth.getBalance(accounts[i]);
    console.log("Balance in "+accounts[i] +" is "+balance);
  }
}


const sendValue = async () =>{

  for (var i = 0; i < accounts.length; i++) {
    await deployedContract.methods.enter().send({
      from:accounts[i],
      value: 10000000000000000000
    });
    console.log("SENT FROM ", accounts[i]);
  }

}


const deploy = async () => {
accounts = await web3.eth.getAccounts();
//console.log(accounts);
console.log("Initial Balances");
deployedContract = await new web3.eth.Contract(JSON.parse(interface))
                        .deploy({data:bytecode})
                       .send({from: accounts[1],  gas:'4712388', gasPrice:'100000000000'});
const deployedAddress = deployedContract.options.address;
let contractValue = await web3.eth.getBalance(deployedAddress);


sendValue().then(() => {
  deployedContract.methods.pickNumber().send({
    from: accounts[0],
     gas:'4712388',
     gasPrice:'100000000000'

  }).then(() => {
    printBalances();
  });

})







}


deploy();
