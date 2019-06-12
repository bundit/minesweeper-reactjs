import React from 'react';
import Board from './Board.jsx';
// import GameControls from './GameControls.jsx';
import { connect } from 'react-redux';
import styles from '../css-modules/Game.module.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.bombIndices = this.generateRandomBombs();
    console.log(this.bombIndices);

    this.handleClick = this.handleClick.bind(this);
  }

  generateRandomBombs() {
    let bombIndices = [];
    let length = this.props.rows*this.props.columns;
    for (let i = 0; i < this.props.bombs; i++) {
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

  render() {
    console.log(this.props.rows);
    return (
      <div className={styles.container}>
        <div className={styles.gameHeader}>
          <p><i className="fa fa-bomb"/>{this.props.bombs}</p>
          <p><i className="fa fa-clock-o"/>{this.props.seconds}</p>
        </div>
        <div>
          <Board rows={this.props.rows} columns={this.props.columns} handleClick={this.handleClick}/>
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
    this.props.dispatch({type: "CLICK-CELL", index: i})
  }

  undo() {

  }
}

const mapStateToProps = (state) => ({
  rows: state.rows,
  columns: state.columns,
  bombs: state.bombs,
  seconds: state.seconds
});
export default connect(mapStateToProps)(Game);
