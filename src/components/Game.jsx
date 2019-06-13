import React from 'react';
import Board from './Board.jsx';
// import GameControls from './GameControls.jsx';
import { connect } from 'react-redux';
import styles from '../css-modules/Game.module.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    // this.bombIndices = this.generateRandomBombs();
    // console.log(this.bombIndices);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    // console.log(this.props.rows);
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

  handleClick(i) {
    const board = this.props.board;
    const col = this.props.columns;
    const len = this.props.rows * col;
    if (this.props.seconds === 0) this.props.dispatch({type: "START-CLOCK"});

    this.props.dispatch({type: "CLICK-CELL", index: i});


    if (board[i].value === 0) {
      let stack = [];
      stack.push(board[i].index);

      while (stack.length) {
        let curr = stack.pop();
        this.props.dispatch({type: "CLICK-CELL", index: curr});

        if (i-1 >= 0 && !board[i-1].revealed && board[i-1].value === 0) stack.push(i-1);
        // if (i-col >= 0 && !board[i-col].revealed && board[i-col].value === 0) stack.push(i-col);
        // if (i+1 < len && !board[i+1].revealed && board[i+1].value === 0) stack.push(i+1);
        // if (i+col < len && !board[i+col].revealed && board[i+col].value === 0) stack.push(i+col);
      }
    }
    console.log(this.props.board);
  }

  undo() {

  }
}

const mapStateToProps = (state) => ({
  rows: state.rows,
  columns: state.columns,
  bombs: state.bombs,
  seconds: state.seconds,
  board: state.board
});

export default connect(mapStateToProps)(Game);
