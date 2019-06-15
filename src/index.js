// React Stuff
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// Redux Stuff
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";

// App Stuff
import './index.css';
import App from './App';
import {
  EASY_ROWS, EASY_COLUMNS,
  MEDIUM_ROWS, MEDIUM_COLUMNS,
  HARD_ROWS, HARD_COLUMNS,
  EASY_MINES, MEDIUM_MINES, HARD_MINES
} from './constants/GameConstants';
console.log(EASY_ROWS);
console.log(EASY_COLUMNS);
// Initial State of the app
const initialState = {
  rows: EASY_ROWS,
  columns: EASY_COLUMNS,
  get board() {
    return new Array(this.rows*this.columns).fill(null);
  },
  totalMines: EASY_MINES,
  bombIndices: [],
  seconds: 0,
  started: false,
  numRevealed: 0,
  numFlagsLeft: EASY_MINES
}

// Reducer methods
function reducer(state = initialState, action) {
  const col = state.columns;
  const row = state.rows;
  let index = action.index;
  let numRevealed = state.numRevealed;
  const len = col * row;

  switch(action.type) {
    // Make a new board
    case "CONFIGURE-NEW-BOARD":
      // Copy board
      const newBoard = state.board.slice(0);
      // Randomize Mines
      let bombIndices = generateRandomMines(row, col, state.totalMines);
      // Create cells
      for (let i = 0; i < newBoard.length; i++) {
        let val = bombIndices.includes(i) ? 'b' : 0;
        let cell = {
          index: i,
          revealed: false,
          value: val,
          flagged: false
        };
        newBoard[i] = cell;
      }

      // Set number values
      bombIndices.forEach(index => {
        if (index-1 >= 0 && index % col !== 0)          newBoard[index-1].value++;
        if (index-col+1 >= 0 && (index+1) % col !== 0)  newBoard[index-col+1].value++;
        if (index-col >= 0)                             newBoard[index-col].value++;
        if (index-col-1 >= 0 && index % col !== 0)      newBoard[index-col-1].value++;
        if (index+1 < len && (index+1) % col !== 0)     newBoard[index+1].value++;
        if (index+col-1 < len && index % col !== 0)     newBoard[index+col-1].value++;
        if (index+col < len)                            newBoard[index+col].value++;
        if (index+col+1 < len && (index+1) % col !== 0) newBoard[index+col+1].value++;
      });

      // Set Mines
      newBoard.forEach((cell, i) => {
        if (Number.isNaN(cell.value))
          cell.value = 'b';
      });

      return {
        ...state,
        bombIndices: bombIndices,
        board: newBoard
      };

    // Reveals a cell
    case "REVEAL-CELL":
      const newClickedBoard = state.board.slice(0);

      newClickedBoard[index] = {
        ...state.board[index],
        revealed: true,
      }

      const revealed = state.board[index].revealed
      return !revealed ? {
        ...state,
        board: newClickedBoard,
        numRevealed: ++numRevealed
      } : state;

    // Flag a cell
    case "FLAG-CELL":
      const newFlaggedBoard = state.board.slice(0);

      newFlaggedBoard[index] = {
        ...state.board[index],
        flagged: true
      }

      return !state.board[index].revealed ? {
        ...state,
        board: newFlaggedBoard,
        numFlagsLeft: --state.numFlagsLeft
      } : state;

    // Unflag a cell
    case "UNFLAG-CELL":
      const newUnflaggedBoard = state.board.slice(0);

      newUnflaggedBoard[index] = {
        ...state.board[index],
        flagged: false
      }

      return state.board[index].flagged ? {
        ...state,
        board: newUnflaggedBoard,
        numFlagsLeft: ++state.numFlagsLeft
      } : state;

    // Keeps track of time
    case "INCREMENT-TIME":
      let time = state.seconds;
      return state.started ? {
        ...state,
        seconds: ++time
      } : state;

    // Starts the clock
    case "START-CLOCK":
      return {
        ...state,
        started: true
      }

    // Restart board with the same cells
    case "RESTART-BOARD":
      const restartBoard = state.board.map(cell => {
        return {
          ...cell,
          revealed: false,
          flagged: false
        };
      });
      return {
        ...state,
        totalMines: 10,
        board: restartBoard,
        seconds: 0,
        started: false,
        numRevealed: 0,
        numFlagsLeft: 10
      }

    default:
      return state;
  }
}

// Create Redux store
const store = createStore(reducer);

store.dispatch({type: "CONFIGURE-NEW-BOARD"});

setInterval(() => store.dispatch({type: "INCREMENT-TIME"}), 1000);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


function generateRandomMines(rows, columns, totalMines) {
  let bombIndices = [];
  let length = rows*columns;
  for (let i = 0; i < totalMines; i++) {
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
