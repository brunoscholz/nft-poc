import moment from 'moment'
import Web3 from 'web3/dist/web3.min.js'
import NFT from '../truffle/abis/NFT.json'

import { NFTStorage } from 'nft.storage'

import axios from 'axios'
import { ETHER_ADDRESS } from '../helpers'

export const loadWeb3 = dispatch => {
  const web3 = new Web3(Web3.givenProvider || 'ws://localhost:7545')
  dispatch({ type: 'WEB3_LOADED', payload: web3 })
  return web3
}

export const loadAccount = async (web3, dispatch) => {
  const accounts = await web3.eth.getAccounts()
  dispatch({ type: 'WEB3_ACCOUNT_LOADED', payload: accounts[0] })
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
    // console.log(Token.ipnft)

    return Token
  } catch (e) {
    console.log("error uplaoding to IPFS", e);
    return null
  }
}

export const mint = async (contract, account, Token, dispatch, price='100000000000') => {
  const nft = await contract.methods.mint(Token.ipnft, price).send({ from: account, value: '6500000000000' })
  dispatch({ type: 'NFT_CREATED', payload: nft })
  return nft
}


export const loadAssets = async (web3, contract, dispatch) => {
  const orderStream = await contract.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest' })
  const allTransfers = []
  orderStream.map(async (event) => {
    const block = await web3.eth.getBlock(event.blockHash)
    const owner = await contract.methods.ownerOf(event.returnValues.tokenId).call();

    let data = {
      from: event.returnValues.from,
      to: event.returnValues.to,
      tokenId: event.returnValues.tokenId,
      isMint: event.returnValues.from === ETHER_ADDRESS,
      isTransfer: event.returnValues.to !== contract.options.address,
      formatedTimestamp: moment.unix(block.timestamp).format('hh:mm:ss a M/D'),
      owner: owner
    }

    allTransfers.push(data)
    return data
  })

  dispatch({ type: 'TRANSFERS_LOADED', payload: allTransfers })
  return allTransfers
}

export const loadAllTokens = async (contract, resolveLink, dispatch) => {
  const totalSupply = await contract.methods.totalSupply().call()
  const tokens = []

  for (let i = 1; i <= totalSupply; i++) {
    const uri = await contract.methods.tokenURI(i).call()
    let response = await axios.get(`https://nftstorage.link/ipfs/${uri}/metadata.json`)
    let data = {
      ...response.data,
      image: resolveLink(response.data.image),
      id: i
    }
    tokens.push(data)
  }

  dispatch({ type: 'ALL_NFTS_LOADED', payload: tokens })
  return tokens
}

export const subscribeToEvents = async (contract, dispatch) => {
  contract.events.Transfer({}, (error, event) => {
    console.log(event.returnValues)
    // dispatch({ type: 'ORDER_MADE', payload: event.returnValues })
  })

  contract.events.Purchase({}, (error, event) => {
    console.log(event.returnValues)
    // dispatch({ type: 'ORDER_MADE', payload: event.returnValues })
  })
}
