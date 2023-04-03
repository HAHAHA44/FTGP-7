## Tech tools

The project mainly uses JavaScript for front-end development. JavaScript has many open source libraries to choose from, such as Vuejs, Reactjs, Nextjs, etc. are all open source js libraries, and these open source libraries can be managed by NPM.

We can use **Reactjs** and **Nextjs** to build our dapp webpage which are shown in the example in coursework. Reactjs is a popular frontend development framework, supported by facebook. Nextjs is based on Reactjs, with this framework, the webpage could be rendered by backend.

**Etherjs** or **Web3js** could be used in the project for connecting decentralised network and getting smart contract.

To store the data in dapp, we can use the smart contract directly. But if our dapp need more data, for example some big files, we should think some other ways to store these files. **IPFS** is a technology to store the files in decentralization way. We can find more information about store files in IPFS from official website or [here](https://hicoldcat.com/posts/blockchain/storage-dapp-using-solidity-and-ipfs/).

## Smart Contract Framework

Currently popular smart contract development frameworks include **Truffle** and **Hardhat**, Truffle is an earlier ETH smart contract development framework, has a huge user base and community environment, and there are many pre-built projects for developers use. Relatively speaking, Hardhat appeared later, using the more popular Ether.js instead of Web3.js used in Truffle to build smart contracts. And Hardhat has a more convenient plug-in system and more powerful smart contract testing functions.

**Ganache** and **Truffle** are belong to a set of crypto development suite. Ganache is a test ETH network, and Truffle is a development tool for smart contract. We can get introduction about Ganache and Truffle from [here](https://medium.com/my-blockchain-development-daily-journey/%E4%BB%8B%E7%B4%B9-truffle-suite-%E5%92%8Cdapp-development-7d747d13cf2b).

The official website of **Hardhat** is simpler. This framework provides us with three components, a smart contract development environment (Hardhat runner), a test network (Hardhat Network), and a VSCode plug-in (Hardhat VSCode).

Comparing the functions of **Truffle** and **Hardhat**, I prefer to use hardhat to develop the smart contract of our project. Because **Hardhat**'s plug-in function is more convenient, and the testing function provided for smart contracts is more powerful.

To get more information of Hardhat, we can explore its [official website](https://hardhat.org/).

## Relative Projects

We can refer to the projects in course W19 and W20, and we can refer to [Hardhat Boilerplate Project](https://github.com/NomicFoundation/hardhat-boilerplate) to build a dapp with react and hardhat.
