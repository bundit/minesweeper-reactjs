import {
  EASY_ROWS, EASY_COLUMNS,
  MEDIUM_ROWS, MEDIUM_COLUMNS,
  HARD_ROWS, HARD_COLUMNS,
  EASY_MINES, MEDIUM_MINES, HARD_MINES
} from '../constants/GameConstants';
import { generateRandomMines } from '../helpers/helpers'

// Initial State of the app
const initialState = {
  timer: {
    started: false,
    seconds: 0,
  },
  gameDimensions: {
    rows: EASY_ROWS,
    columns: EASY_COLUMNS,
    totalMines: EASY_MINES,
  },
  game: {
    showGame: true,
    board: [],
    mineIndices: [],
    numRevealed: 0,
    numFlagsLeft: EASY_MINES,
  },
  highscores: [],
  // loading: false
}

// Reducer methods
export default function reducer(state = initialState, action) {

  switch(action.type) {
    // Make a new board
    case "CONFIGURE-NEW-BOARD":
      return configureNewBoard(state, action);
    // Reveals a cell
    case "REVEAL-CELL":
      return revealCell(state, action);
    // Flag a cell
    case "FLAG-CELL":
      return flagCell(state, action);
    // Unflag a cell
    case "UNFLAG-CELL":
      return unflagCell(state, action);
    // Keeps track of time
    case "INCREMENT-TIME":
      return incrementTime(state, action);
    // Starts the clock
    case "START-CLOCK":
      return startClock(state, action);
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
    // Toggle show game / show high scores
    case "TOGGLE-SHOW-GAME":
      return toggleShowGame(state, action);
    case "GET-HIGHSCORES":
      // let highscores;
      //
      // fetch('/api/highscores')
      //   .then(res => res.json())
      //   .then(data => highscores = data)
      //   .then(() => console.log(highscores));
      // console.log(highscores);
      //
      // return {
      //   ...state,
      //   highscores: highscores
      // };
      return state;
    case "DELETE-HIGHSCORE":
      console.log(state);
      return state;
    case "ADD-HIGHSCORE":
      return state;
    case "LOADING-FINISHED":
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

// Configure a new board
function configureNewBoard(state, action) {
  const col = state.gameDimensions.columns;
  const row = state.gameDimensions.rows;
  const len = col * row;
  const newBoard = Array(col * row);
  const totalMines = state.gameDimensions.totalMines

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
    timer: {
      started: false,
      seconds: 0
    },
    game: {
      ...state.game,
      board: newBoard,
      mineIndices: mineIndices,
      numRevealed: 0,
      numFlagsLeft: state.gameDimensions.totalMines
    }
  };
}

// Reveal a cell
function revealCell(state, action) {
  const index = action.index;
  const newClickedBoard = state.game.board.slice(0);
  const currIsRevealed = state.game.board[index].isRevealed;

  newClickedBoard[index] = {
    ...state.game.board[index],
    isRevealed: true,
  }

  return !currIsRevealed ? {
    ...state,
    game: {
      ...state.game,
      board: newClickedBoard,
      numRevealed: ++state.game.numRevealed
    }
  } : state;
}

// Flag a cell
function flagCell(state, action) {
  const index = action.index;
  const newFlaggedBoard = state.game.board.slice(0);

  newFlaggedBoard[index] = {
    ...state.game.board[index],
    isFlagged: true
  }

  const cellIsRevealed = state.game.board[index].isRevealed;
  const numFlagsLeft = state.game.numFlagsLeft;

  return !cellIsRevealed && numFlagsLeft > 0 ? {
    ...state,
    game: {
      ...state.game,
      board: newFlaggedBoard,
      numFlagsLeft: --state.game.numFlagsLeft
    }
  } : state;
}

// Unflag a cell
function unflagCell(state, action) {
  const index = action.index;
  const newUnflaggedBoard = state.game.board.slice(0);
  const cellIsFlagged = state.game.board[index].isFlagged;

  newUnflaggedBoard[index] = {
    ...state.game.board[index],
    isFlagged: false
  }

  return cellIsFlagged ? {
    ...state,
    game: {
      ...state.game,
      board: newUnflaggedBoard,
      numFlagsLeft: ++state.game.numFlagsLeft
    }
  } : state;
}

// Increment time
function incrementTime(state, action) {
  const gameHasStarted = state.timer.started;

  return gameHasStarted ? {
    ...state,
    timer: {
      ...state.timer,
      seconds: ++state.timer.seconds
    }
  } : state;
}

// Start the timer
function startClock(state, action) {
  return {
    ...state,
    timer: {
      ...state.timer,
      started: true
    }
  }
}

// Clear the game board
function restartBoard(state, action) {
  const clearedBoard = state.game.board.map(cell => {
    return {
      ...cell,
      isRevealed: false,
      isFlagged: false
    };
  });

  return {
    ...state,
    timer: {
      started: false,
      seconds: 0
    },
    game: {
      ...state.game,
      board: clearedBoard,
      numRevealed: 0,
      numFlagsLeft: state.gameDimensions.totalMines
    }
    // totalMines: state.gameDimensions.totalMines,
  }
}

function changeToEasy(state, action) {
  return {
    ...state,
    gameDimensions: {
      rows: EASY_ROWS,
      columns: EASY_COLUMNS,
      numFlagsLeft: EASY_MINES
    }
    // totalMines: EASY_MINES,
  }
}
function changeToMedium(state, action) {
  return {
    ...state,
    gameDimensions: {
      rows: MEDIUM_ROWS,
      columns: MEDIUM_COLUMNS,
      numFlagsLeft: MEDIUM_MINES
    }
    // totalMines: MEDIUM_MINES,
  }
}
function changeToHard(state, action) {
  return {
    ...state,
    gameDimensions: {
      rows: HARD_ROWS,
      columns: HARD_COLUMNS,
      numFlagsLeft: HARD_MINES
    }
    // totalMines: HARD_MINES,
  }
}
function toggleShowGame(state, action) {
  return {
    ...state,
    game: {
      ...state.game,
      showGame: !state.game.showGame
    }
    // showGame: !state.game.showGame
  }
}
