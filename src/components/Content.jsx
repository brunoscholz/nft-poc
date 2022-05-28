// import { useAppState } from '../contexts/AppState'
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
  // const [ state, dispatch ] = useAppState()

  // const exchange = exchangeSelector(state)

  useEffect(() => {
    loadBlockchainData()
  }, [])

  const loadBlockchainData = async () => {
    // await loadAllOrders(exchangeSelector(state), dispatch)
    // await subscribeToEvents(exchange, dispatch)
  }

  return (
    <div id="wrapper">
      {/* <div>
      { images.map((uri, idx) => {
        return (<img key={idx} src={`https://ipfs.infura.io/ipfs/${uri}`} width='100px' />)
      })}
      </div> */}
      {/* <input type='file' onChange={onChange} />
      {fileUrl && <img src={fileUrl} width='600px' />} */}
      <section id="intro" className="wrapper style1 fullscreen fade-up">
        <div className="inner">
          <h1>Hyperspace</h1>
          <p>Just another fine responsive site template designed by <a href="http://html5up.net">HTML5 UP</a><br />
          and released for free under the <a href="http://html5up.net/license">Creative Commons</a>.</p>
          <ul className="actions">
            <li><a href="#one" className="button scrolly">Learn more</a></li>
          </ul>
        </div>
      </section>
    </div>
  )

}

export default Content
