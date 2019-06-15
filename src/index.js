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
      const newBoard = state.board.slice(0);

      // Randomize Mines
      let bombIndices = generateRandomMines(row, col, state.totalMines);

      // Create cells
      for (let i = 0; i < newBoard.length; i++) {
        let val = bombIndices.includes(i) ? 'b' : 0;
        let cell = {
          index: i,
          isRevealed: false,
          value: val,
          isFlagged: false
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
      const currIsRevealed = state.board[index].isRevealed;

      newClickedBoard[index] = {
        ...state.board[index],
        isRevealed: true,
      }

      return !currIsRevealed ? {
        ...state,
        board: newClickedBoard,
        numRevealed: ++numRevealed
      } : state;

    // Flag a cell
    case "FLAG-CELL":
      const newFlaggedBoard = state.board.slice(0);
      const cellIsRevealed = state.board[index].isRevealed;

      newFlaggedBoard[index] = {
        ...state.board[index],
        isFlagged: true
      }

      return !cellIsRevealed ? {
        ...state,
        board: newFlaggedBoard,
        numFlagsLeft: --state.numFlagsLeft
      } : state;

    // Unflag a cell
    case "UNFLAG-CELL":
      const newUnflaggedBoard = state.board.slice(0);
      const cellIsFlagged = state.board[index].isFlagged;

      newUnflaggedBoard[index] = {
        ...state.board[index],
        isFlagged: false
      }

      return cellIsFlagged ? {
        ...state,
        board: newUnflaggedBoard,
        numFlagsLeft: ++state.numFlagsLeft
      } : state;

    // Keeps track of time
    case "INCREMENT-TIME":
      let seconds = state.seconds;
      const gameHasStarted = state.started;

      return gameHasStarted ? {
        ...state,
        seconds: ++seconds
      } : state;

    // Starts the clock
    case "START-CLOCK":
      return {
        ...state,
        started: true
      }

    // Restart board with the same cells
    case "RESTART-BOARD":
      const clearedBoard = state.board.map(cell => {
        return {
          ...cell,
          isRevealed: false,
          isFlagged: false
        };
      });
      return {
        ...state,
        totalMines: state.totalMines,
        board: clearedBoard,
        seconds: 0,
        started: false,
        numRevealed: 0,
        numFlagsLeft: state.totalMines
      }

    default:
      return state;
  }
}

// Create Redux store
const store = createStore(reducer);

// Initialize game board
store.dispatch({type: "CONFIGURE-NEW-BOARD"});

// Set the timer
setInterval(() => store.dispatch({type: "INCREMENT-TIME"}), 1000);

// Render
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
