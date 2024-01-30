
# Event Funding & Engagement Platform with Crowdfunding

## Overview
Welcome to our Event Funding & Engagement Platform with Crowdfunding, a revolutionary app that transforms the way events are funded. Leveraging blockchain technology, this platform ensures a more transparent, secure, and efficient crowdfunding process.

## Features
- **Blockchain Integration**: Utilizes Ethereum blockchain for secure and transparent transactions.
- **User-Friendly Interface**: Built with React, HTML, and CSS for a seamless user experience.
- **Secure Interactions**: Metamask integration for safe and easy user interactions.
- **Smart Contract Implementation**: Automates and secures funding processes through Ethereum smart contracts.
- **Crowdfunding Functionality**: Allows users to create and contribute to crowdfunding campaigns for events.

## Getting Started

Firstly, install [MetaMask](https://metamask.io/), [Ganache](https://www.trufflesuite.com/ganache) and truffle if you haven't installed them.

```shell
npm install -g truffle
```

After the installation, open Ganache and start a workspace. Make sure the host and port in `truffle-config.js` to be the same with the port in that workspace.

```javascript
// truffle-config.js
development: {
	host: "127.0.0.1",
	port: 8545,
	network_id: "*",
}
```
Next, deploy the smart contract.

```shell
truffle migrate
```
After that, replace the address in `src/eth/CrowdFunding.js`  with the address of CrowdFunding contract in Ganache.

```javascript
// CrowdFunding.js
const address = '0x8C4b4Fb240376A0335224Fc6c67f4EFB834a05fA';
```
    
Finally, install all the dependencies for this project.

```shell
yarn install
```

## Run
Start the application by the following command.

```shell
yarn start
```

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgements
Thanks to everyone who has contributed to the success of this project!
