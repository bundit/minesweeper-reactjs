// import actions
// Constants
import {
  EASY_ROWS, EASY_COLUMNS,
  MEDIUM_ROWS, MEDIUM_COLUMNS,
  HARD_ROWS, HARD_COLUMNS,
  EASY_MINES, MEDIUM_MINES, HARD_MINES
} from '../constants/GameConstants';

// Helper
import { generateRandomMines } from '../helpers/helpers'

const initialState = {
  rows: EASY_ROWS,
  columns: EASY_COLUMNS,
  totalMines: EASY_MINES,
  showGame: true,
  board: [],
  mineIndices: [],
  numRevealed: 0,
  numFlagsLeft: EASY_MINES,
};

export default function(state = initialState, action) {
  switch (action.type) {
    // Make a new board
    case "CONFIGURE-NEW-BOARD":
      return configureNewBoard(state, action);
    // Toggle show game / show high scores
    case "TOGGLE-SHOW-GAME":
      return toggleShowGame(state, action);
    // Reveals a cell
    case "REVEAL-CELL":
      return revealCell(state, action);
    // Flag a cell
    case "FLAG-CELL":
      return flagCell(state, action);
    // Unflag a cell
    case "UNFLAG-CELL":
      return unflagCell(state, action);
    // Restart board with the same cells
    case "RESTART-BOARD":
      return restartBoard(state, action);
    // Change to easy mode
    case "CHANGE-TO-EASY":
      return changeToEasy(state, action);
    // Change to medium mode
    case "CHANGE-TO-MEDIUM":
      return changeToMedium(state, action);
    // Change to hard mode
    case "CHANGE-TO-HARD":
      return changeToHard(state, action);
    default:
      return state;
      // return {
      //   ...state,
      //   rows: HARD_ROWS,
      //   columns: HARD_COLUMNS,
      //   numFlagsLeft: HARD_MINES
      // }

  }
}

// Configure a new board
function configureNewBoard(state, action) {
  const col = state.columns;
  const row = state.rows;
  const len = col * row;
  const newBoard = Array(col * row);
  const totalMines = state.totalMines

  // Randomize Mines
  let mineIndices = generateRandomMines(row, col, totalMines);

  // Create cells
  for (let i = 0; i < newBoard.length; i++) {
    let val = mineIndices.includes(i) ? 'b' : 0;
    let cell = {
      index: i,
      isRevealed: false,
      value: val,
      isFlagged: false
    };
    newBoard[i] = cell;
  }

  // Set number values
  mineIndices.forEach(index => {
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
    board: newBoard,
    mineIndices: mineIndices,
    numRevealed: 0,
    numFlagsLeft: state.totalMines
  };
}

function toggleShowGame(state, action) {
  return {
    ...state,
    showGame: !state.showGame
  }
}

// Reveal a cell
function revealCell(state, action) {
  const index = action.index;
  const newClickedBoard = state.board.slice(0);
  const cellIsRevealed = state.board[index].isRevealed;

  newClickedBoard[index] = {
    ...state.board[index],
    isRevealed: true,
  }

  return !cellIsRevealed ? {
    ...state,
    board: newClickedBoard,
    numRevealed: ++state.numRevealed
  } : state;
}

// Flag a cell
function flagCell(state, action) {
  const index = action.index;
  const newFlaggedBoard = state.board.slice(0);

  newFlaggedBoard[index] = {
    ...state.board[index],
    isFlagged: true
  }

  const cellIsRevealed = state.board[index].isRevealed;
  const numFlagsLeft = state.numFlagsLeft;

  return !cellIsRevealed && numFlagsLeft > 0 ? {
    ...state,
    board: newFlaggedBoard,
    numFlagsLeft: --state.numFlagsLeft
  } : state;
}

// Unflag a cell
function unflagCell(state, action) {
  const index = action.index;
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
}

// Clear the game board
function restartBoard(state, action) {
  const clearedBoard = state.board.map(cell => {
    return {
      ...cell,
      isRevealed: false,
      isFlagged: false
    };
  });

  return {
    ...state,
    board: clearedBoard,
    numRevealed: 0,
    numFlagsLeft: state.totalMines
  }
}

function changeToEasy(state, action) {
  return {
    ...state,
    rows: EASY_ROWS,
    columns: EASY_COLUMNS,
    totalMines: EASY_MINES,
  }
}

function changeToMedium(state, action) {
  return {
    ...state,
    rows: MEDIUM_ROWS,
    columns: MEDIUM_COLUMNS,
    totalMines: MEDIUM_MINES
  }
}

function changeToHard(state, action) {
  return {
    ...state,
    rows: HARD_ROWS,
    columns: HARD_COLUMNS,
    totalMines: HARD_MINES,
  }
}
