import { useAppState, useIPFS } from '../contexts/AppState'
import { useEffect } from 'react'
import { contractSelector, tokensLoadedSelector, tokensSelector } from '../store/selectors'
import { loadAllTokens } from '../store/actions'
// import { loadAllOrders, subscribeToEvents } from '../store'

// import Trades from './Trades'
// import OrderBook from './OrderBook'
// import MyTransactions from './MyTransactions'
// import PriceChart from './PriceChart'
// import Balance from './Balance'
// import NewOrder from './NewOrder'

const Content = () => {
  const [ state, dispatch ] = useAppState()
  const { resolveLink } = useIPFS()

  const contract = contractSelector(state)
  const loaded = tokensLoadedSelector(state)
  const tokens = tokensSelector(state)

  useEffect(() => {
    loadAllTokens(contract, resolveLink, dispatch)
  }, [])

  // const loadBlockchainData = async () => {
  //   // await loadAllOrders(exchangeSelector(state), dispatch)
  //   // await subscribeToEvents(exchange, dispatch)
  // }

  // const loadTokens = async () => {
  //   await loadAssets(contract, dispatch)
  //   const totalSupply = await contract.methods.totalSupply().call()
  //   console.log(`totalSupply ${totalSupply}`)

  //   for (let i = 9; i <= totalSupply; i++) {
  //     const uri = await contract.methods.tokenURI(i).call()
  //     // const owner = await contract.methods.ownerOf(i).call()
  //     // console.log(uri, owner)
  //     let response = await axios.get(`https://nftstorage.link/ipfs/${uri}/metadata.json`)
  //     let data = {
  //       ...response.data,
  //       image: response.data.image.replace('ipfs://', 'https://nftstorage.link/ipfs/')
  //     }
  //     updateImages(oldArray => [...oldArray, data])
  //   }
  // }

  return (
    <>
      <div id="main">
        <div className="inner">
          <header>
            <h1>NFT Marketplace</h1>
            <p></p>
          </header>
          <section className="tiles">
            { loaded && tokens.length && tokens.map((data, idx) => {
              return (
                <article key={idx} className={`style${idx % 7}`}>
                  <span className="image">
                    <img src={`${data.image}`} alt={`${data.name}`} />
                  </span>
                  <a href={`details/${idx}`}>
                    <h2>{data.name || 'unamed NFT'}</h2>
                    <div className="content">
                      <p>{data.description}</p>
                    </div>
                  </a>
                  {/* <div>{data.attributes}</div> */}
                </article>
              )
            })}
          </section>
        </div>
      </div>
    </>
  )

}

export default Content
