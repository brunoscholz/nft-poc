/* eslint-disable */
import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import Contract from '../truffle/abis/NFT.json'

import { create } from 'ipfs-http-client'

const loadContract = async () => {
  try {
    //THIS ALLOWS YOU TALK TO BLOCKCHAIN
    const web3Modal = new Web3Modal({
      network: 'ganache', // optional
      cacheProvider: true, // optional
      providerOptions: {} // required
    })
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const netId = await web3.eth.net.getId()
    //THIS WILL LOAD YOUR CONTRACT FROM BLOCKCHAIN
    const contract = new web3.eth.Contract(Contract.abi, Contract.networks[netId].address)
    console.log(contract.options.address)

    // GET THE AMOUNT OF NFTs MINTED
    const totalSupply = await contract.methods.totalSupply().call()
    console.log(`totalSupply ${totalSupply}`)

    // THE TOKEN ID YOU WANT TO QUERY
    const tokenID = 4

    // GET THE TOKEN URI
    // THE URI IS THE LINK TO WHERE YOUR JSON DATA LIVES
    const uri = await contract.methods.tokenURI(tokenID).call()
    console.log(uri)

    // GET THE OWNER OF A SPECIFIC TOKEN
    const owner = await contract.methods.ownerOf(tokenID).call()
    console.log(owner)

    // CHECK IF A SPECIFIC TOKEN IS SOLD
    const sold = await contract.methods.sold(tokenID).call()
    console.log(sold)

    // GET PRICE OF A SPECIFIC TOKEN
    const price = await contract.methods.price(tokenID).call()
    console.log(price)

    return contract
  } catch (e) {
    console.log('error = ', e)
  }
}

const mint = async (uri, price='100000000000000000') => {
  const web3Modal = new Web3Modal({
    network: 'ganache', // optional
    cacheProvider: true, // optional
    providerOptions: {} // required
  })
  const provider = await web3Modal.connect()
  const web3 = new Web3(provider)
  const netId = await web3.eth.net.getId()
  const contract = new web3.eth.Contract(Contract.abi, Contract.networks[netId].address)

  const nft = await contract.methods.mint(uri, price).send({ from: '0x08283D44ba01fA31435D37270A1834e0040Ba2bB' })
  console.log(nft)
}

const projectId = '29lBmbmUOPilG6GW7yJTqi2zyFo'
const projectSecret = 'fd66aff1be8ee0ebec58f14158b47255'

const client = create({
  host: 'ipfs.infura.io',
  port:5001,
  path: '/api/v0',
  auth: projectId + ':' + projectSecret
})
const getIpfs = async () => {
  try {
    const hash = 'Qmcyp6bZvRVg8ngMqo9Vc6Ggez57MFytxfz2tRjQL7JPAd'
    const file = client.get('https://ipfs.infura.io/ipfs/QmSioQ78VA8hS6DZnrWWReX8MLWvSzcZobtjK322yWottz')
    console.log(file)
    // await fetch(`https://ipfs.infura.io/ipfs/${hash}`).then(data => console.log(data.url))
  } catch (e) {
    console.log('error = ', e)
  }
}

const Home = () => {
  const [fileUrl, updateFileUrl] = useState(``)
  let contract = null
  let showImages = false

  const images = []

  useEffect(() => {
    contract = loadContract()
    loadTokens()
    // getIpfs()
    // updateFileUrl('https://ipfs.infura.io/ipfs/Qmcyp6bZvRVg8ngMqo9Vc6Ggez57MFytxfz2tRjQL7JPAd')
  }, [])

  const loadTokens = async () => {
    const web3Modal = new Web3Modal({
      network: 'ganache', // optional
      cacheProvider: true, // optional
      providerOptions: {} // required
    })
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const netId = await web3.eth.net.getId()
    //THIS WILL LOAD YOUR CONTRACT FROM BLOCKCHAIN
    contract = new web3.eth.Contract(Contract.abi, Contract.networks[netId].address)
    const totalSupply = await contract.methods.totalSupply().call()
    console.log(`totalSupply ${totalSupply}`)

    for (let i = 5; i <= totalSupply; i++) {
      const uri = await contract.methods.tokenURI(i).call()
      const owner = await contract.methods.ownerOf(i).call()
      console.log(owner)
      images.push(uri)
    }

    console.log(images)
    showImages = images.length > 0
  }

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      updateFileUrl(url)
      mint(added.path)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  const elements = ['one', 'two', 'three'];
  return (
    <div className='Home'>
      <ul>
        {elements.map((value, index) => {
          return <li key={index}>{value}</li>
        })}
      </ul>
      <div>
        { images.map((uri, idx) => {
          return (<img key={idx} src={`https://ipfs.infura.io/ipfs/${uri}`} width='100px' />)
        })}
      </div>
      <h1>IPFS Example</h1>
      <input type='file' onChange={onChange} />
      {fileUrl && <img src={fileUrl} width='600px' />}
    </div>
  )
}

export default Home
