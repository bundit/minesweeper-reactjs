import React from 'react';
import Board from './Board.jsx';
import HighScoreChart from './HighScoreChart.jsx';
import { connect } from 'react-redux';
import styles from '../css-modules/Game.module.css';

class Game extends React.Component {
  constructor(props) {
    super(props);

    // Click handlers
    this.handleClick = this.handleClick.bind(this);
    this.handleFlag = this.handleFlag.bind(this);

    // Mode Handlers
    this.handleEasyMode = this.handleEasyMode.bind(this);
    this.handleMediumMode = this.handleMediumMode.bind(this);
    this.handleHardMode = this.handleHardMode.bind(this);

    // Game handlers
    this.handleRestart = this.handleRestart.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);

    this.handleShowCharts = this.handleShowCharts.bind(this);
    this.handleShowGame = this.handleShowGame.bind(this);
  }

  // Check win condition after every change
  componentDidUpdate(prevProps) {

    if (prevProps.numRevealed !== this.props.numRevealed)
      if (this.checkWinCondition())
        this.handleWinCondition();
  }
  // Initialize game when Game is mounted
  componentDidMount() {
    // Initialize game board
    this.props.dispatch({type: "CONFIGURE-NEW-BOARD"});

    // Set the timer
    setInterval(() => this.props.dispatch({type: "INCREMENT-TIME"}), 1000);

    // Get highscores
    this.props.dispatch({type: "GET-HIGHSCORES"});

  }

  // Handle a click on a cell to reveal a cell
  // cellIndex - the index of the cell that was clicked
  handleClick(cellIndex) {
    const cellClicked = this.props.board[cellIndex];

    // Do nothing
    if (cellClicked.isRevealed || cellClicked.isFlagged) return;

    // Start the clock if first click
    if (this.props.seconds === 0)
      this.props.dispatch({type: "START-CLOCK"});

    // Click the cell if it hasn't been revealed
    if (!cellClicked.isRevealed && !cellClicked.isFlagged)
      this.props.dispatch({type: "REVEAL-CELL", index: cellIndex});

    // Check if bomb was clicked
    if (cellClicked.value === 'b') {
      alert('Uh oh, you clicked a bomb. Try a new game');
    }

    // Clicked empty cell
    if (cellClicked.value === 0)
      this.emptyField(cellIndex);
  }

  // Flag the cell with index i if it has not been revealed
  // Unflag the cell if it is already flagged
  // cellIndex - the index of the cell that was right clicked
  handleFlag(cellIndex) {
    const cellFlagged = this.props.board[cellIndex];
    // Start the clock if first click
    if (this.props.seconds === 0)
      this.props.dispatch({type: "START-CLOCK"});

    if (!cellFlagged.isFlagged && this.props.totalMines > 0) {
      this.props.dispatch({type: "FLAG-CELL", index: cellIndex});
    }
    else if (cellFlagged.isFlagged){
      this.props.dispatch({type: "UNFLAG-CELL", index: cellIndex});
    }
  }

  // Clear the board
  handleRestart() {
    this.props.dispatch({type: "RESTART-BOARD"});
  }
  // Create a whole new board
  handleNewGame() {
    this.props.dispatch({type: "CONFIGURE-NEW-BOARD"});
  }
  // Change the mode to easy if it isn't already
  handleEasyMode() {
    this.props.dispatch({type: "CHANGE-TO-EASY"});
    this.props.dispatch({type: "CONFIGURE-NEW-BOARD"});
  }
  // Change the mode to mediium if it isn't already
  handleMediumMode() {
    this.props.dispatch({type: "CHANGE-TO-MEDIUM"});
    this.props.dispatch({type: "CONFIGURE-NEW-BOARD"});
  }
  // Change the mode to hard if it isn't already
  handleHardMode() {
    this.props.dispatch({type: "CHANGE-TO-HARD"});
    this.props.dispatch({type: "CONFIGURE-NEW-BOARD"});
  }
  // Check if the win condition has been met
  checkWinCondition() {
    const total = this.props.rows * this.props.columns;
    return (total <= this.props.numRevealed + this.props.totalMines)
  }
  // Do something when win condition is met
  // Call to action if so
  handleWinCondition() {
    alert('u won');
  }
  handleShowGame() {
    if (!this.props.showGame)
      this.props.dispatch({type: "TOGGLE-SHOW-GAME"});
  }
  handleShowCharts() {
    if (this.props.showGame)
      this.props.dispatch({type: "TOGGLE-SHOW-GAME"});
  }

  // Render the component
  render() {
    let timeDisplay;
    const seconds = this.props.seconds;
    if (seconds < 10)
      timeDisplay = `00${seconds}`;
    else if (seconds < 100)
      timeDisplay = `0${seconds}`;
    else
      timeDisplay = seconds;

    return (
      <div className={styles.container}>
        <div className={styles.gameNavWrapper}>
          <button onClick={this.handleShowGame} className={this.props.showGame ? styles.active : undefined}>Minesweeper</button>
          <button onClick={this.handleShowCharts} className={!this.props.showGame ? styles.active : undefined}>High Scores</button>
        </div>
        <div className={styles.gameWrapper} style={{display: !this.props.showGame ? 'none' : undefined}}>
          <div className={styles.gameHeader}>
            <p><i className="fa fa-bomb"/>{this.props.numFlagsLeft}</p>
            <p><i className="fa fa-clock-o"/>{timeDisplay}</p>
          </div>
          <div>
            <Board
              rows={this.props.rows}
              columns={this.props.columns}
              board={this.props.board}
              handleClick={this.handleClick}
              handleFlag={this.handleFlag}
            />
          </div>
          <div className={styles.gameControls}>
            <button
              onClick={this.handleEasyMode}
              className={styles.easyButton}
            > Easy </button>
            <button
              onClick={this.handleMediumMode}
              className={styles.mediumButton}
            > Medium </button>
            <button
              onClick={this.handleHardMode}
              className={styles.hardButton}
            > Hard </button>
          </div>
          <div className={styles.gameControls}>
            <button onClick={this.handleRestart}> Restart </button>
            <button onClick={this.handleNewGame}> New Game </button>
          </div>
        </div>
        <HighScoreChart showGame={this.props.showGame} highscores={this.props.highscores}/>
      </div>
    );
  }

  // Empty the field when a cell that has no mine neighbors is clicked
  // Will reveal all adjacent empty cells and one layer beyond that
  // i - the index of the cell that was clicked
  emptyField(i) {
    let emptySpaces = new Set();
    emptySpaces.add(i);

    // Short name assignments
    const col = this.props.columns;
    const len = this.props.rows * col;
    const mineIndices = this.props.mineIndices;
    const board = this.props.board;

    let prevSize;

    // Keep adding the adjacent cells that are empty
    do {
      prevSize = emptySpaces.size;

      emptySpaces.forEach(index => {
        let isLeftMargin = index % col !== 0;
        let isRightMargin = (index+1) % col !== 0;

        let left = isLeftMargin ? (index - 1) : -1;
        let right = isRightMargin ? (index + 1) : 1000;
        let top = index - col;
        let bottom = index + col;

        if (top >= 0 && !mineIndices.includes(top) && board[top].value === 0)
          emptySpaces.add(top);
        if (left >= 0 && !mineIndices.includes(left) && board[left].value === 0)
          emptySpaces.add(left);
        if (right < len && !mineIndices.includes(right) && board[right].value === 0)
          emptySpaces.add(right);
        if (bottom < len && !mineIndices.includes(bottom) && board[bottom].value === 0)
          emptySpaces.add(bottom);
      });
    } while (emptySpaces.size !== prevSize)

    // Add the bordering cells that are not empty
    let border = new Set();
    emptySpaces.forEach(index => {
      let isLeftMargin = index % col !== 0;
      let isRightMargin = (index+1) % col !== 0;

      let left = isLeftMargin ? (index - 1) : -1;
      let right = isRightMargin ? (index + 1) : 1000;
      let topLeft = isLeftMargin ? (index - col - 1) : -1;
      let top = index - col;
      let topRight = isRightMargin ? (index - col + 1) : -1;
      let bottomLeft = isLeftMargin ? (index + col - 1) : 1000;
      let bottom = index + col;
      let bottomRight = isRightMargin ? (index + col + 1) : 1000;

      if (topLeft >= 0 && !mineIndices.includes(topLeft) && board[topLeft].value !== 'b' && board[topLeft].value !== 0)
        border.add(topLeft);
      if (top >= 0 && !mineIndices.includes(top) && board[top].value !== 'b' && board[top].value !== 0)
        border.add(top);
      if (topRight >= 0 && !mineIndices.includes(topRight) && board[topRight].value !== 'b' && board[topRight].value !== 0)
        border.add(topRight);
      if (left >= 0 && !mineIndices.includes(left) && board[left].value !== 'b' && board[left].value !== 0)
        border.add(left);
      if (right < len && !mineIndices.includes(right) && board[right].value !== 'b' && board[right].value !== 0)
        border.add(right);
      if (bottomLeft < len && !mineIndices.includes(bottomLeft) && board[bottomLeft].value !== 'b' && board[bottomLeft].value !== 0)
        border.add(bottomLeft);
      if (bottom < len && !mineIndices.includes(bottom) && board[bottom].value !== 'b' && board[bottom].value !== 0)
        border.add(bottom);
      if (bottomRight < len && !mineIndices.includes(bottomRight) && board[bottomRight].value !== 'b' && board[bottomRight].value !== 0)
        border.add(bottomRight);
    });

    let all = new Set([...emptySpaces, ...border]);
    all.forEach(cell => this.props.dispatch({type: "REVEAL-CELL", index: cell}));
  }
}

const mapStateToProps = (state) => ({
  // Timer
  seconds: state.timer.seconds,
  // GameDimensions
  rows: state.gameDimensions.rows,
  columns: state.gameDimensions.columns,
  totalMines: state.gameDimensions.totalMines,
  // Game
  showGame: state.game.showGame,
  board: state.game.board,
  mineIndices: state.game.mineIndices,
  numRevealed: state.game.numRevealed,
  numFlagsLeft: state.game.numFlagsLeft,
  // Highscores
  highscores: state.highscores
});

export default connect(mapStateToProps)(Game);
