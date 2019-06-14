import React from 'react';
import Board from './Board.jsx';
// import GameControls from './GameControls.jsx';
import { connect } from 'react-redux';
import styles from '../css-modules/Game.module.css';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.handleFlag = this.handleFlag.bind(this);
  }

  handleClick(i) {
    if (this.props.board[i].revealed || this.props.board[i].flagged) return;
    // Start the clock if first click
    if (this.props.seconds === 0)
      this.props.dispatch({type: "START-CLOCK"});

    // Click the cell if it hasn't been revealed
    if (!this.props.board[i].revealed && !this.props.board[i].flagged)
      this.props.dispatch({type: "CLICK-CELL", index: i});

    // Check if bomb was clicked
    if (this.props.board[i].value === 'b') {
      alert('Uh oh, you clicked a bomb. Try a new game');
    }

    // Check empty cells around
    if (this.props.board[i].value === 0)
      this.emptyField(i);


    const total = this.props.rows * this.props.columns;
    console.log(total);
    console.log(this.props.numRevealed);
    console.log(this.props.numFlags);
    console.log(this.props.bombs);
    if (total <= this.props.numRevealed + this.props.bombs){
      alert('u won')
    }
  }
  handleFlag(i) {
    // Start the clock if first click
    if (this.props.seconds === 0)
      this.props.dispatch({type: "START-CLOCK"});

    if (!this.props.board[i].flagged && this.props.bombs > 0) {
      this.props.dispatch({type: "FLAG-CELL", index: i});
    }
    else if (this.props.board[i].flagged){
      this.props.dispatch({type: "UNFLAG-CELL", index: i});
    }
  }

  handleRestart() {
    this.props.dispatch({type: "RESTART-BOARD"});
  }
  undo() {

  }

  render() {
    let time;
    const seconds = this.props.seconds;
    if (seconds < 10)
      time = `00${seconds}`;
    else if (seconds < 100)
      time = `0${seconds}`;
    else
      time = seconds;


    return (
      <div className={styles.container}>
        <div className={styles.gameHeader}>
          <p><i className="fa fa-bomb"/>{this.props.bombs}</p>
          <p><i className="fa fa-clock-o"/>{time}</p>
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
          <button onClick={this.handleRestart}> Restart </button>
          <button> <i className="fa fa-undo"/> </button>
          <button onClick=""> New Game </button>
        </div>
      </div>
    );
  }

  emptyField(i) {
    let set = new Set();
    set.add(i);
    const col = this.props.columns;
    const len = this.props.rows * col;
    const bombIndices = this.props.bombIndices;
    const board = this.props.board;

    let prevSize;
    do {
      prevSize = set.size;

      set.forEach(index => {
        let isLeftMargin = index % col !== 0;
        let isRightMargin = (index+1) % col !== 0;

        let left = isLeftMargin ? (index - 1) : -1;
        let right = isRightMargin ? (index + 1) : 1000;
        let top = index - col;
        let bottom = index + col;

        if (top >= 0 && !bombIndices.includes(top) && board[top].value === 0)
          set.add(top);
        if (left >= 0 && !bombIndices.includes(left) && board[left].value === 0)
          set.add(left);
        if (right < len && !bombIndices.includes(right) && board[right].value === 0)
          set.add(right);
        if (bottom < len && !bombIndices.includes(bottom) && board[bottom].value === 0)
          set.add(bottom);
      });
    } while (set.size !== prevSize)

    let border = new Set();
    set.forEach(index => {
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

      if (topLeft >= 0 && !bombIndices.includes(topLeft) && board[topLeft].value !== 'b' && board[topLeft].value !== 0)
        border.add(topLeft);
      if (top >= 0 && !bombIndices.includes(top) && board[top].value !== 'b' && board[top].value !== 0)
        border.add(top);
      if (topRight >= 0 && !bombIndices.includes(topRight) && board[topRight].value !== 'b' && board[topRight].value !== 0)
        border.add(topRight);
      if (left >= 0 && !bombIndices.includes(left) && board[left].value !== 'b' && board[left].value !== 0)
        border.add(left);
      if (right < len && !bombIndices.includes(right) && board[right].value !== 'b' && board[right].value !== 0)
        border.add(right);
      if (bottomLeft < len && !bombIndices.includes(bottomLeft) && board[bottomLeft].value !== 'b' && board[bottomLeft].value !== 0)
        border.add(bottomLeft);
      if (bottom < len && !bombIndices.includes(bottom) && board[bottom].value !== 'b' && board[bottom].value !== 0)
        border.add(bottom);
      if (bottomRight < len && !bombIndices.includes(bottomRight) && board[bottomRight].value !== 'b' && board[bottomRight].value !== 0)
        border.add(bottomRight);
    });

    let all = new Set([...set, ...border]);
    all.forEach(cell => this.props.dispatch({type: "CLICK-CELL", index: cell}));
  }
}

const mapStateToProps = (state) => ({
  rows: state.rows,
  columns: state.columns,
  bombs: state.bombs,
  bombIndices: state.bombIndices,
  seconds: state.seconds,
  board: state.board,
  numRevealed: state.numRevealed,
  numFlags: state.numFlags
});

export default connect(mapStateToProps)(Game);
