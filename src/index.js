import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { AppStateProvider } from './contexts/AppState'
import { initialState, combineReducers } from './store/reducers'
import { web3Reducer, nftReducer } from './store/reducers'

const appReducers = combineReducers({
  web3: web3Reducer,
  nft: nftReducer,
  // exchange: exchangeReducer
})

ReactDOM.render(
  <React.StrictMode>
    <AppStateProvider reducer={appReducers} initialState={initialState}>
      <App />
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
