/* eslint-disable */
import React, { useEffect } from 'react'
import { useAppState } from '../contexts/AppState'
import { loadWeb3, loadAccount, loadContract } from '../store/actions'

import Navbar from './Navbar'
import Content from './Content'
import Spinner from './Spinner'
import Footer from './Footer'
import { contractLoadedSelector } from '../store/selectors'

const loadBlockchainData = async (dispatch) => {
  const web3 = loadWeb3(dispatch)
  const networkId = await web3.eth.net.getId()
  await loadAccount(web3, dispatch)

  const nft = await loadContract(web3, networkId, dispatch)
  if (!nft) {
    window.alert('NFT smart contract not detected in the current network.')
    return
  }

  // // GET THE AMOUNT OF NFTs MINTED
  // const totalSupply = await nft.methods.totalSupply().call()
  // console.log(totalSupply, 'nft\'s minted')
}

const Home = () => {
  const [ state, dispatch ] = useAppState()

  useEffect(() => {
    loadBlockchainData(dispatch)
  }, [])

  return (
    <div id="wrapper">
      <Navbar />
      { contractLoadedSelector(state) ? <Content /> : <Spinner /> }
      <Footer />
    </div>
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