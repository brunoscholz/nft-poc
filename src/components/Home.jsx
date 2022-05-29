/* eslint-disable */
import React, { useEffect } from 'react'
import { useAppState } from '../contexts/AppState'
import { loadWeb3, loadAccount, loadContract } from '../store/actions'

import Navbar from './Navbar'
import Content from './Content'
import Spinner from './Spinner'
import { nftLoadedSelector } from '../store/selectors'

const loadBlockchainData = async (dispatch) => {
  const web3 = loadWeb3(dispatch)
  const networkId = await web3.eth.net.getId()
  await loadAccount(web3, dispatch)

  const nft = await loadContract(web3, networkId, dispatch)
  if (!nft) {
    window.alert('NFT smart contract not detected in the current network.')
    return
  }

  // GET THE AMOUNT OF NFTs MINTED
  const totalSupply = await nft.methods.totalSupply().call()
  console.log(totalSupply, 'nft\'s minted')
}

// const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY

const Home = () => {
  const [ state, dispatch ] = useAppState()

  let fileUrl
  const updateFileUrl = () => {}

  useEffect(() => {
    loadBlockchainData(dispatch)
  }, [])

  // async function onChange(e) {
  //   const file = e.target.files[0]
  //   try {
  //     const added = await client.add(file)
  //     const url = `https://ipfs.infura.io/ipfs/${added.path}`
  //     updateFileUrl(url)
  //     mint(added.path)
  //   } catch (error) {
  //     console.log('Error uploading file: ', error)
  //   }
  // }

  // console.log(process.env.REACT_APP_NFT_STORAGE_KEY)

  console.log(state)
  return (
    <>
      <Navbar />
      { nftLoadedSelector(state) ? <Content /> : <Spinner /> }
    </>
  )
}

export default Home


// const loadContractOld = async () => {
//   try {
//     //THIS ALLOWS YOU TALK TO BLOCKCHAIN
//     const web3Modal = new Web3Modal({
//       network: 'ganache', // optional
//       cacheProvider: true, // optional
//       providerOptions: {} // required
//     })
//     const provider = await web3Modal.connect()
//     const web3 = new Web3(provider)
//     const netId = await web3.eth.net.getId()
//     //THIS WILL LOAD YOUR CONTRACT FROM BLOCKCHAIN
//     const contract = new web3.eth.Contract(Contract.abi, Contract.networks[netId].address)
//     console.log(contract.options.address)

//     // GET THE AMOUNT OF NFTs MINTED
//     const totalSupply = await contract.methods.totalSupply().call()
//     console.log(`totalSupply ${totalSupply}`)

//     // THE TOKEN ID YOU WANT TO QUERY
//     const tokenID = 4

//     // GET THE TOKEN URI
//     // THE URI IS THE LINK TO WHERE YOUR JSON DATA LIVES
//     const uri = await contract.methods.tokenURI(tokenID).call()
//     console.log(uri)

//     // GET THE OWNER OF A SPECIFIC TOKEN
//     const owner = await contract.methods.ownerOf(tokenID).call()
//     console.log(owner)

//     // CHECK IF A SPECIFIC TOKEN IS SOLD
//     const sold = await contract.methods.sold(tokenID).call()
//     console.log(sold)

//     // GET PRICE OF A SPECIFIC TOKEN
//     const price = await contract.methods.price(tokenID).call()
//     console.log(price)

//     return contract
//   } catch (e) {
//     console.log('error = ', e)
//   }
// }