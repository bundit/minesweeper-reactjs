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
    return new Array(this.rows*this.columns).fill(null);
  },
  bombs: 10,
  seconds: 0
}

// Reducer methods
function reducer(state = initialState, action) {

  switch(action.type) {
    case "CONFIGURE-NEW-BOARD":
      const newBoard = state.board.slice(0);
      // Randomize bombs
      let bombIndices = generateRandomBombs(state.rows, state.columns, state.bombs);
      // Create cells
      for (let i = 0; i < newBoard.length; i++) {
        let obj = {revealed: false, value: 0};
        if (bombIndices.includes(i)) {
          obj.value = 'b';
        }
        newBoard[i] = obj;
      }

      const col = state.columns;
      const len = newBoard.length;
      bombIndices.forEach(index => {
        if (index-1 >= 0)     newBoard[index-1].value++;
        if (index-col+1 >= 0) newBoard[index-col+1].value++;
        if (index-col >= 0)   newBoard[index-col].value++;
        if (index-col-1 >= 0) newBoard[index-col-1].value++;
        if (index+1 < len)    newBoard[index+1].value++;
        if (index+col-1 < len)newBoard[index+col-1].value++;
        if (index+col < len)  newBoard[index+col].value++;
        if (index+col+1 < len)newBoard[index+col+1].value++;
      });

      return {...state, board: newBoard};

    case "CLICK-CELL":
      const board = state.board.slice(0);
      console.log(state.board);
      board[action.index].revealed = true;

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
store.dispatch({type: "CONFIGURE-NEW-BOARD"});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


///

function generateRandomBombs(rows, columns, bombs) {
  let bombIndices = [];
  let length = rows*columns;
  for (let i = 0; i < bombs; i++) {
    let index = Math.floor(Math.random() * (length-1));
    if (!bombIndices.includes(index)) {
      bombIndices.push(index);
    }
    else {
      i--;
    }
  }
  return bombIndices;
}
