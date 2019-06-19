import {
  EASY_ROWS, EASY_COLUMNS,
  MEDIUM_ROWS, MEDIUM_COLUMNS,
  HARD_ROWS, HARD_COLUMNS,
  EASY_MINES, MEDIUM_MINES, HARD_MINES
} from '../constants/GameConstants';
import { generateRandomMines } from '../helpers/helpers'

// Initial State of the app
const initialState = {
  rows: EASY_ROWS,
  columns: EASY_COLUMNS,
  get board() {
    return new Array(this.rows*this.columns).fill(null);
  },
  totalMines: EASY_MINES,
  bombIndices: [],
  started: false,
  seconds: 0,
  numRevealed: 0,
  numFlagsLeft: EASY_MINES
}

// Reducer methods
export default function reducer(state = initialState, action) {
  const col = state.columns;
  const row = state.rows;
  let index = action.index;
  let numRevealed = state.numRevealed;
  const len = col * row;

  switch(action.type) {
    // Make a new board
    case "CONFIGURE-NEW-BOARD":
      const newBoard = Array(col * row);

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

      // numRevealed: 0,
      // numFlagsLeft: EA
      return {
        ...state,
        bombIndices: bombIndices,
        board: newBoard,
        seconds: 0,
        started: false,
        numRevealed: 0,
        numFlagsLeft: state.totalMines
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
      const numFlagsLeft = state.numFlagsLeft;

      newFlaggedBoard[index] = {
        ...state.board[index],
        isFlagged: true
      }

      return !cellIsRevealed && numFlagsLeft > 0 ? {
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

    case "CHANGE-TO-EASY":
      return {
        ...state,
        rows: EASY_ROWS,
        columns: EASY_COLUMNS,
        totalMines: EASY_MINES,
        numFlagsLeft: EASY_MINES
      }
    case "CHANGE-TO-MEDIUM":
      return {
        ...state,
        rows: MEDIUM_ROWS,
        columns: MEDIUM_COLUMNS,
        board: [],
        totalMines: MEDIUM_MINES,
        numFlagsLeft: MEDIUM_MINES
      }
    case "CHANGE-TO-HARD":
        return {
          ...state,
          rows: HARD_ROWS,
          columns: HARD_COLUMNS,
          totalMines: HARD_MINES,
          numFlagsLeft: HARD_MINES
        }

    default:
      return state;
  }
}
