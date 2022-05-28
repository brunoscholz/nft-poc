import { get } from 'lodash'
import { createSelector } from 'reselect'

// import { ETHER_ADDRESS, GREEN, RED, tokens, ether, formatBalance } from '../helpers'

const web3 = state => get(state, 'web3')
export const web3Selector = createSelector(web3, w => w)

const account = state => get(state, 'account')
export const accountSelector = createSelector(account, a => a)

const nftLoaded = state => get(state, 'nft.loaded')
export const nftLoadedSelector = createSelector(nftLoaded, loaded => loaded)

const nftContract = state => get(state, 'nft.contract')
export const nftSelector = createSelector(nftContract, t => t)