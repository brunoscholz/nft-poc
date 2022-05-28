import { useAppState } from '../contexts/AppState'
import { useEffect } from 'react'
// import { loadAllOrders, subscribeToEvents } from '../store'
// import { exchangeSelector } from '../store/selectors'

// import Trades from './Trades'
// import OrderBook from './OrderBook'
// import MyTransactions from './MyTransactions'
// import PriceChart from './PriceChart'
// import Balance from './Balance'
// import NewOrder from './NewOrder'

const Content = () => {
  const [ state, dispatch ] = useAppState()

  // const exchange = exchangeSelector(state)

  useEffect(() => {
    loadBlockchainData()
  }, [])

  const loadBlockchainData = async () => {
    // await loadAllOrders(exchangeSelector(state), dispatch)
    // await subscribeToEvents(exchange, dispatch)
  }

  return (
    <div className='content'>
      {/* <div>
      { images.map((uri, idx) => {
        return (<img key={idx} src={`https://ipfs.infura.io/ipfs/${uri}`} width='100px' />)
      })}
      </div> */}
      <h1>Content</h1>
      {/* <input type='file' onChange={onChange} />
      {fileUrl && <img src={fileUrl} width='600px' />} */}
    </div>
  )

}

export default Content
