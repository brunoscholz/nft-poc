## NFT REACT MARKETPLACE

## Introduction

This project is a simple NFT minter for study purposes.
You can mint nft's that will have settings/attributes and it's image uploaded to IPFS.

Check it out the [Live Demo](https://nftsmarket.herokuapp.com/)

Needs [Metamask](https://metamask.io/download/) wallet with an account connected to the website and it needs to run on Goerli Test Network.

<img src="https://github.com/brunoscholz/ntf-poc/blob/master/public/images/metamask1.png" width="300px"/>

## Getting Started

- Use Node 16.13 and  yarn 1.22

Download and install [Ganache](https://trufflesuite.com/ganache/)

Download and install [Metamask](https://metamask.io/download/)

Install project dependencies:
```
$ yarn
```

Start the project:
```
$ yarn start
```

Connect Metamask extension with the website [http://localhost:3000](http://localhost:3000).

You will need an Infura account for a blockchain entrypoint if you want to deploy to a test network.

### Truffle Commands

1. Test contracts. Will compile & create abi files:
```
$ truffle compile
```

2. Deploy contract on network (as an example, on a testnet like goerli, use --network goerli)
```
$ truffle migrate --reset
```

3. run mint script (on a testnet, use --network `name-of-network` as defined in truffle-config.js):
```
$ truffle exec src/utils/mint.js
```

### Caveats

This may require you to start a local blockchain (ganache) by yourself and possibly some additional settings in truffle-config.js like:

commenting lines 12 through 16
```js
  // development: {
  //   host: "ganache-cli",   // Ganache
  //   port: 8546,            // Standard Ethereum port (default: none)
  //   network_id: "*",       // Any network (default: none)
  // },
```

## Or Using Docker

```
$ docker-compose up -d --build
```

## Todo
- [ ] Auction Functionality
