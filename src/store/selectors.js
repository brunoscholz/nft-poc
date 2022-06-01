import { get } from 'lodash'
import { createSelector } from 'reselect'

// import { ETHER_ADDRESS, GREEN, RED, tokens, ether, formatBalance } from '../helpers'

const web3 = state => get(state, 'web3')
export const web3Selector = createSelector(web3, w => w)

const account = state => get(state, 'account')
export const accountSelector = createSelector(account, a => a)

const nftLoaded = state => get(state, 'nft.loaded')
export const contractLoadedSelector = createSelector(nftLoaded, loaded => loaded)

const nftContract = state => get(state, 'nft.contract')
export const contractSelector = createSelector(nftContract, t => t)

const tokensLoaded = state => get(state, 'marketplace.loaded')
export const tokensLoadedSelector = createSelector(tokensLoaded, loaded => loaded)

const tokens = state => get(state, 'marketplace.data')
export const tokensSelector = createSelector(tokens, t => t)

export const getTokenById = (data, id) => {
  return data && data.filter(x => x.id === id).pop()
}

const transfersLoaded = state => get(state, 'nft.transfers.loaded')
export const transfersLoadedSelector = createSelector(transfersLoaded, loaded => loaded)

const transfers = state => get(state, 'nft.transfers.data')
export const transfersSelector = createSelector(transfers, t => t)

// const filledOrders = state => get(state, 'exchange.filledOrders.data', [])
// export const filledOrdersSelector = createSelector(filledOrders, orders => {
//   // sort orders by date ascending for price comparison
//   orders = orders.sort((a, b) => a.timestamp - b.timestamp)

//   orders = decorateFilledOrders(orders)

//   // sort the orders by date descending for display
//   orders = orders.sort((a, b) => b.timestamp - a.timestamp)
//   return orders
// })
