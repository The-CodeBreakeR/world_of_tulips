
World of Tulips
=================


World of Tulips is a **fully decentralized**, autonomous application (Dapp) implemented on the Ethereum blockchain, itself open-source, that virtualizes an attractive and entertaining tulip growing community. The World offers the opportunity to grow, trade, and sell stable value tulips. The World of Tulips is based upon the core belief that the true decentralized app is without owner or manager. To this end, for full transparency, all smart contracts and front end implementation code are either published on the Ethereum blockchain or otherwise made publicly available so that participants in the World of Tulips can have the confidence that the World and their assets are secure: the existence of a central agency is not required. All tulips are recoverable by their transparent properties and transactions stored on Ethereum blockchain: the World of Tulips does not obscure the determination of any properties in private smart contracts. Furthermore, this smart contract transparency ensures that the value of tulips is also transparent: there are no ‘special’ breeds that are held in reserve by a central agency that, once released, could reduce the valuation of existing tulips. Instead, all tulips grow organically through the same mechanism from digging for bulbs to growing a tulip, to breeding new tulips. Intrinsic tulip value is determined by tulip attractiveness, as determined pseudo-randomly, its proximity to World genesis Generation 0, whether it has been bred, and its sale record at market. Sellers are able to set their own tulip price: the market will determine whether it is acceptable.

# How to Install and Run

In this project, Truffle development framework is used for compiling, deploying, and testing Solidity smart contracts. Documents on Truffle’s website at [https://www.trufflesuite.com/](https://www.trufflesuite.com/) provide comprehensive guidance on how to install and use it. Below, we will shortly describe the commands to install Truffle and test contracts with it:

  

In order to install Truffle on the system, the command below is used:

  
```
$ npm install -g truffle
```
  

NodeJS 5.0+ is recommended for the installation of Truffle.

  

Then, in order to compile smart contracts, the following command is used:

  
```
$ truffle compile
```
  

This command will write the required JSON files to .\build\contracts.

  

After we compiled the contracts, we need to deploy them to the blockchain. In order to do so, and for the purpose of testing, we use Ganache, a personal blockchain provided by the Truffle development team ([https://www.trufflesuite.com/ganache](https://www.trufflesuite.com/ganache)). Therefore, having Ganache open, we run the following command in order to deploy our smart contracts:

  
```
$ truffle migrate
```
  

After we run the command, we should be able to see the transaction related to contract deployment in a mined block on Ganache.

  

To run the tests, written to check the correctness of the contracts, the following command is used:

  
```
$ truffle test
```

  

To be able to launch the web application, we first need to install the dependencies of the project. Hence, we navigate to the root directory of the project and run the following command:

  
```
$ npm install
```
  

This command will install all dependencies of the project in .\node_modules folder. By default, this command installs all modules listed as dependencies in package.json.

  

Before we run the web application, we need to specify in .\src\config.js file, the address of the deployed smart contract, the contract ABI taken from the JSON file of the compiled contract in the build folder, and whether we use Ganache or Metamask as gateway.

  

Now, to run the application in the developer mode, we run the following command:

  
```
$ npm start
```
  

It opens [http://localhost:3000/](http://localhost:3000/) to view the application in the browser. The page will reload if any edit is made.
