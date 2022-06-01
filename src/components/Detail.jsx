import { useAppState } from '../contexts/AppState'
import { useParams } from 'react-router-dom'
import { accountSelector, contractSelector, tokensSelector, transfersSelector } from '../store/selectors'
import Spinner from './Spinner'
import { getEllipsisTxt } from '../helpers'

const Detail = () => {
  const [ state ] = useAppState()
  let { id } = useParams()
  // const [ token, setToken ] = useState()

  const contract = contractSelector(state)
  const account = accountSelector(state)
  const tokens = tokensSelector(state)
  const transfers = transfersSelector(state)

  const token = tokens ? tokens.filter(x => x.id.toString() === id.toString()).pop() : null
  const tokenMeta = transfers ? transfers.filter(x => x.tokenId.toString() === id.toString()) : null

  const buyNft = async (e, id) => {
    e.preventDefault()
    const purchase = await contract.methods.buy(id).send({ from: account, value: '100000000000000000' })
    console.log(purchase)
  }

  // console.log(tokenMeta)
  return (
    <div id="main">
      {
        token ? <div className="inner">
          <div className='item-container'>
            <div className='item-wrapper'>
              <div className='item-summary'>
                <article className='item-media-frame'>
                  <div className='media--frame'>
                    <div className='img-card'>
                      <div className='img-container' style={{
                        backgroundImage: `url("${token.image}")`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        height: '500px'
                      }}></div>
                    </div>
                  </div>
                </article>
                <section className='item-summary-frame'>
                  <div className='item--description'>
                    <div className="panel">
                      <div className="panel-header">
                        <i></i>
                        <span>Description</span>
                      </div>
                      <div className="panel-body">
                        <div className="panel-body--content">
                          <div className="item--description">
                            <section className="item--creator"></section>
                            <div className="item--description-text">
                              {token.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='item--properties'>
                    <div className="panel">
                      <div className="panel-header">
                        <i></i>
                        <span>Properties</span>
                      </div>
                      <div className="panel-body">
                        <div className="panel-body--content">
                          <div className="item--properties">
                            {token.attributes.map((item, idx) => {
                              return (
                                <div key={idx} className='item--property'>
                                  <div className='property--type'>{item.trait_type}</div>
                                  <div className='property--value'>{item.value}</div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='item--details'>
                    <div className="panel">
                      <div className="panel-header">
                        <i></i>
                        <span>Info</span>
                      </div>
                      <div className="panel-body">
                        <div className="panel-body--content">
                          <div className="panel-body--list">
                            <div className="panel-body--list-item">
                              <span>Contract:</span><a href='/#'>{getEllipsisTxt(contract.options.address, 4)}</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className='item-main'>
                <section className='item--header'>
                  <h1>{token.name}</h1>
                </section>
                <section className='item--counts'>
                  <div className="owner">
                    <span>Owned by: {tokenMeta[0].owner === contract.options.address ? <a href='/#'>Contract </a> : ''}({getEllipsisTxt(tokenMeta[0].owner, 4)})</span>
                  </div>
                </section>
                <section className='item--frame'>
                  <div className="panel">
                    <div className="panel-header">
                      <i></i>
                      <span>Action</span>
                    </div>
                    <div className="panel-body">
                      <div className="panel-body--content">
                        { tokenMeta[0].owner === account ? '' : <button type='button' className='primary' onClick={e => buyNft(e, tokenMeta[0].tokenId) }>Buy</button> }
                      </div>
                    </div>
                  </div>
                </section>
                <section className='item--frame'>
                  <div className="panel">
                    <div className="panel-header">
                      <i></i>
                      <span>History</span>
                    </div>
                    <div className="panel-body">
                      <div className="panel-body--content">
                        <div className="panel-body--list">
                          <table className='table table-dark table-sm small'>
                            <thead>
                              <tr>
                                <th>Event</th>
                                <th>Time</th>
                                <th>From</th>
                                <th>To</th>
                              </tr>
                            </thead>
                            <tbody>
                              { tokenMeta.map((item, idx) => {
                                return(
                                  <tr key={idx}>
                                    <td>{ item.isMint ? 'Minted' : 'Transfer' }</td>
                                    <td>{ item.formatedTimestamp }</td>
                                    <td>{ getEllipsisTxt(item.from, 4) }</td>
                                    <td>{ getEllipsisTxt(item.to, 4) }</td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        : <Spinner />
      }
    </div>
  )
}

export default Detail
