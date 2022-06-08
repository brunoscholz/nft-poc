/* eslint-disable */
import { useAppState, useIPFS } from '../contexts/AppState'
import { useEffect } from 'react'
import { contractSelector, tokensLoadedSelector, tokensSelector } from '../store/selectors'
import { loadAllTokens } from '../store/actions'

import { Link } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

// import { loadAllOrders, subscribeToEvents } from '../store'

// import Trades from './Trades'
// import OrderBook from './OrderBook'
// import MyTransactions from './MyTransactions'
// import PriceChart from './PriceChart'
// import Balance from './Balance'
// import NewOrder from './NewOrder'

const Content = () => {
  const [state, dispatch] = useAppState()
  const { resolveLink } = useIPFS()
  const contract = contractSelector(state)
  const loaded = tokensLoadedSelector(state)
  const tokens = tokensSelector(state)

  useEffect(() => {
    loadAllTokens(contract, resolveLink, dispatch)
  }, [])

  return (
    <div id='main'>
      <div className='inner'>
        {loaded && tokens.length ? (
          <section className='tiles'>
            {tokens.map((data, idx) => {
              return (
                <article key={idx} className={`style${idx % 7}`}>
                  <span className='image'>
                    <img src={`${data.image}`} alt={`${data.name}`} />
                  </span>
                  <Link to={`/detail/${data.id}`}>
                    <h2>{data.name || 'unamed NFT'}</h2>
                    <div className='content'>
                      <p>{data.description}</p>
                    </div>
                  </Link>
                  {/* <div>{data.attributes}</div> */}
                </article>
              )
            })}
          </section>
        ) : (
          <header>
            <h1>No NFTs Minted yet!</h1>
            <p>Create one <Link to={'/create'}>here</Link></p>
            <Spinner />
          </header>
        )}
      </div>
    </div>
  )
}

export default Content
