export const initialState = {
  web3: null,
  account: null,
  nft: null,
  marketplace: null,
  wallet: null
}

export const web3Reducer = (state, action) => {
  switch (action.type) {
    case 'WEB3_LOADED':
      return {
        ...state,
        web3: action.payload
      }
    case 'WEB3_ACCOUNT_LOADED':
      return {
        ...state,
        account: action.payload
      }
    case 'ETHER_BALANCE_LOADED':
      return {
        ...state,
        balance: action.payload
      }
    default:
      return state
  }
}

export const nftReducer = (state, action) => {
  switch (action.type) {
    case 'NFT_LOADED':
      return {
        ...state,
        nft: {
          ...state.nft,
          loaded: true,
          contract: action.payload
        }
      }
    case 'TRANSFERS_LOADED':
      return {
        ...state,
        nft: {
          ...state.nft,
          transfers: {
            loaded: true,
            data: action.payload
          }
        }
      }
    // case 'TOKEN_BALANCE_LOADED':
    //   return {
    //     ...state,
    //     token: {
    //       ...state.token,
    //       balance: action.payload
    //     }
    //   }
    default:
      return state
  }
}

export const marketReducer = (state, action) => {
  switch (action.type) {
    case 'ALL_NFTS_LOADED':
      return {
        ...state,
        marketplace: {
          ...state.marketplace,
          loaded: true,
          data: action.payload
        }
      }
    case 'NFT_CREATED':
      return {
        ...state,
        marketplace: {
          ...state.marketplace,
          loaded: true,
          data: [...state.marketplace.data, action.payload]
        }
      }
    default:
      return state
  }
}

export const combineReducers = reducers => {
  return (state, action) => {
    return Object.keys(reducers).reduce((acc, prop) => {
      return {
        ...acc,
        ...reducers[prop]({ [prop]: acc[prop] }, action)
      }
    }, state)
  }
}