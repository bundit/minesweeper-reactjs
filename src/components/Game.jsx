import React from 'react';
import Board from './Board.jsx';
// import GameControls from './GameControls.jsx';
import { connect } from 'react-redux';
import styles from '../css-modules/Game.module.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    // Start the clock if first click
    if (this.props.seconds === 0)
      this.props.dispatch({type: "START-CLOCK"});

    // Dispatch
    if (!this.props.board[i].revealed)
      this.props.dispatch({type: "CLICK-CELL", index: i});

    // Check empty cells around
    if (this.props.board[i].value === 0) {
      setTimeout(() => this.checkLeftDown(i), 5);
      setTimeout(() => this.checkRightUp(i), 5);
    }
  }

  checkLeftDown(i, next) {
    let col = this.props.columns;
    if (i-1 >= 0 && i % col !== 0 && this.props.board[i-1].revealed === false &&    this.props.board[i-1].value === 0) this.handleClick(i-1);
    if (i-col >= 0 && this.props.board[i-col].revealed === false && this.props.board[i-col].value === 0) this.handleClick(i-col);
  }
  checkRightUp(i) {
    let len = this.props.rows * this.props.columns;
    let col = this.props.columns;
    if (i+1 < len && (i+1) % col !== 0 && this.props.board[i+1].revealed === false &&    this.props.board[i+1].value === 0) this.handleClick(i+1);
    if (i+col < len && this.props.board[i+col].revealed === false &&  this.props.board[i+col].value === 0) this.handleClick(i+col);
  }

  undo() {

  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.gameHeader}>
          <p><i className="fa fa-bomb"/>{this.props.bombs}</p>
          <p><i className="fa fa-clock-o"/>{this.props.seconds < 10 ? "00" + this.props.seconds :
                                            this.props.seconds < 100 ? "0" + this.props.seconds : this.props.seconds}</p>
        </div>
        <div>
          <Board rows={this.props.rows} columns={this.props.columns} handleClick={this.handleClick} board={this.props.board}/>
        </div>
        <div className={styles.gameControls}>
          <button> Restart </button>
          <button> <i className="fa fa-undo"/> </button>
          <button> New Game </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rows: state.rows,
  columns: state.columns,
  bombs: state.bombs,
  seconds: state.seconds,
  board: state.board,
  numRevealed: state.numRevealed
});

export default connect(mapStateToProps)(Game);
