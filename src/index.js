import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from "redux";
import { Provider } from "react-redux";

// Initial State of the app
const initialState = {
  rows: 10,
  columns: 8,
  get board() {
    return Array(this.rows*this.columns).fill(null);
  },
  bombs: 10,
  seconds: 0
}
// get c () {
//     return this.a + this.b;
//   }

// Reducer methods
function reducer(state = initialState, action) {
  console.log(action);
  switch(action.type) {
    case "CLICK-CELL":
      const board = [...state.board]
      board[action.index] = 'x';
      console.log(action.index);
      return {
        ...state,
        board: board,
      }
    default:
      return state;
  }
}

// Create Redux store
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
