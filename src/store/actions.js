import Web3 from 'web3/dist/web3.min.js'
import NFT from '../truffle/abis/NFT.json'

const { create } = require("ipfs-http-client");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  path: "api/v0",
  // auth: projectId + ':' + projectSecret
});

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
    const url = await client.add(file);
    const uploadedImageUrl = `https://ipfs.infura.io/ipfs/${url?.path}`;

    // add Metadata to IPFS
    // const metadata = {
    //   name: "example name",
    //   description: "example description",
    //   image: uploadedImageUrl,
    //   attributes: [{ type: '', value:'' }]
    //   lab: '0x000'
    // };
    metadata.image = uploadedImageUrl
    const metadataRes = await client.add(JSON.stringify(metadata));
    const metaDataUrl = `https://ipfs.infura.io/ipfs/${metadataRes?.path}`;

    // pin to infura
    await client.pin.add(metadataRes?.path);

    // return image & metadata URLs and also the CID for each
    return {
      uploadedImageUrl,
      metaDataUrl,
      metaDataHashCID: metadataRes?.path,
      imageHashCID: url?.path,
    };
  } catch (e) {
    console.log("error uplaoding to IPFS", e);
    return null
  }
}

export const mint = async (contract, account, dispatch, uri, price='100000000000000000') => {
  const nft = await contract.methods.mint(uri, price).send({ from: account })
  console.log(nft)
}


// const loadTokens = async () => {
//   const web3Modal = new Web3Modal({
//     network: 'ganache', // optional
//     cacheProvider: true, // optional
//     providerOptions: {} // required
//   })
//   const provider = await web3Modal.connect()
//   const web3 = new Web3(provider)
//   const netId = await web3.eth.net.getId()
//   //THIS WILL LOAD YOUR CONTRACT FROM BLOCKCHAIN
//   contract = new web3.eth.Contract(Contract.abi, Contract.networks[netId].address)
//   const totalSupply = await contract.methods.totalSupply().call()
//   console.log(`totalSupply ${totalSupply}`)

//   for (let i = 5; i <= totalSupply; i++) {
//     const uri = await contract.methods.tokenURI(i).call()
//     const owner = await contract.methods.ownerOf(i).call()
//     console.log(owner)
//     updateImages(oldArray => [...oldArray, uri])
//   }
// }
