require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const Web3 = require('web3');
const contract = require('@truffle/contract');
const artifacts = require('./build/Verify.json');
app.use(express.json());

if (typeof web3 !== 'undefined') {
  var web3 = new Web3(web3.currentProvider);
} else {
  var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

const sendData = async (err, client) => {
  const lms = new web3.eth.Contract(
    artifacts.abi,
    '0xfb083ce033Bfa46441DE05697a65C22395717D8D'
  );
  //const lms = LMS.at(contract_address) for remote nodes deployed on ropsten or rinkeby
  routes(app, lms);
  app.listen(process.env.PORT || 8082, () => {
    console.log('listening on port ' + (process.env.PORT || 8082));
  });
};

sendData();
