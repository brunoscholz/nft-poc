import Web3 from 'web3/dist/web3.min.js'
import NFT from '../truffle/abis/NFT.json'

import { NFTStorage } from 'nft.storage'

// const { create } = require("ipfs-http-client");

// const client = create({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
//   path: "api/v0",
//   // auth: projectId + ':' + projectSecret
// });

import axios from 'axios'

export const loadWeb3 = dispatch => {
  const web3 = new Web3(Web3.givenProvider || 'ws://localhost:7545')
  dispatch({ type: 'WEB3_LOADED', payload: web3 })
  return web3

  // try {
  //   //THIS ALLOWS YOU TALK TO BLOCKCHAIN
  //   const web3Modal = new Web3Modal({
  //     network: 'ganache', // optional
  //     cacheProvider: true, // optional
  //     providerOptions: {} // required
  //   })
  //   const provider = await web3Modal.connect()
  //   const web3 = new Web3(provider)
  //   const netId = await web3.eth.net.getId()
  //   //THIS WILL LOAD YOUR CONTRACT FROM BLOCKCHAIN
  //   const contract = new web3.eth.Contract(Contract.abi, Contract.networks[netId].address)
  // } catch(e) {
  //   console.log('error:', e)
  // }
}

export const loadAccount = async (web3, dispatch) => {
  const accounts = await web3.eth.getAccounts()
  dispatch({ type: 'WEB3_ACCOUNT_LOADED', payload: accounts[0] })
  console.log(accounts)
  return accounts[0]
}

export const loadContract = async (web3, networkId, dispatch) => {
  try {
    const nft = new web3.eth.Contract(NFT.abi, NFT.networks[networkId].address)
    dispatch({ type: 'NFT_LOADED', payload: nft })
    return nft
  } catch (error) {
    console.log('NFT Contract not deployed to the current network. Please select another network with metamask')
    return null
  }
}

export const uploadFileToIPFS = async (file, metadata) => {
  try {
    // add File to IPFS
    // const url = await client.add(file);
    // const uploadedImageUrl = `https://ipfs.infura.io/ipfs/${url?.path}`;
    const nftstorage = new NFTStorage({token: process.env.REACT_APP_NFT_STORAGE_KEY})

    // add Metadata to IPFS
    // const result = await nftstorage.store({
    //   image: file,
    //   name: 'my first ipfs file',
    //   description: 'no idea',
    //   attributes: [
    //     { trait_type: 'cat', value: 'nature eva' }
    //   ]
    // })
    metadata.image = file
    const Token = await nftstorage.store(metadata)
    console.log(Token.ipnft)

    return Token
  } catch (e) {
    console.log("error uplaoding to IPFS", e);
    return null
  }
}

export const mint = async (contract, account, Token, dispatch, uri, price='100000000000000000') => {
  const nft = await contract.methods.mint(Token.ipnft, price).send({ from: account })
  return nft
}


export const loadAssets = async (contract, dispatch) => {
  const orderStream = await contract.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest' })
  const allOrders = orderStream.map(event => event.returnValues)

  console.log(allOrders)
  return allOrders
}

export const loadAllTokens = async (contract, resolveLink, dispatch) => {
  const totalSupply = await contract.methods.totalSupply().call()
  const tokens = []

  for (let i = 9; i <= totalSupply; i++) {
    const uri = await contract.methods.tokenURI(i).call()
    let response = await axios.get(`https://nftstorage.link/ipfs/${uri}/metadata.json`)
    let data = {
      ...response.data,
      image: resolveLink(response.data.image)
    }
    tokens.push(data)
  }

  console.log(tokens)
  dispatch({ type: 'ALL_NFTS_LOADED', payload: tokens })
  return tokens
}

export const subscribeToEvents = async () => {

}
