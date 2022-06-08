/* eslint-disable */
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { loadAccount, loadAllTokens, loadAssets, loadContract, loadWeb3, subscribeToEvents } from './store/actions'
import { useAppState, useIPFS } from './contexts/AppState'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Content from './components/Content'
import Detail from './components/Detail'
import Mint from './components/Mint'
import Spinner from './components/Spinner'
import { contractLoadedSelector } from './store/selectors'

const loadBlockchainData = async dispatch => {
  const { resolveLink } = useIPFS()
  const web3 = loadWeb3(dispatch)
  const networkId = await web3.eth.net.getId()
  await loadAccount(web3, dispatch)

  const nft = await loadContract(web3, networkId, dispatch)
  if (!nft) {
    window.alert('NFT smart contract not detected in the current network. Change your metamask network to Goerli Test; the contract is deployed there!')
    return
  }

  await loadAssets(web3, nft, dispatch)
  await loadAllTokens(nft, resolveLink, dispatch)
  await subscribeToEvents(web3, nft, dispatch)
}

export default function App() {
  const [state, dispatch] = useAppState()

  const loaded = contractLoadedSelector(state)

  useEffect(() => {
    loadBlockchainData(dispatch)
  }, [])

  // console.log(state)
  return (
    <Router>
      <div id='wrapper'>
        <Navbar />
        <Switch>
          <Route exact path='/detail/:id'>
            {loaded ? <Detail /> : <Spinner />}
          </Route>
          <Route exact path='/create'>
            {loaded ? <Mint /> : <Spinner />}
          </Route>
          <Route exact path='/home'>
            {loaded ? <Content /> : <Spinner />}
          </Route>
          <Redirect exact from='/' to='/home' />
          <Route path='*'>{() => <p>404 Page</p>}</Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}
