import React from 'react';
import Square from './Square.jsx';
import { CELL_SIZE } from '../constants/GameConstants';

function Board(props) {
    const squares = [];
    let length = props.rows*props.columns;

    // Create list of squares
    for (let i = 0; i < length; i++) {
      squares.push(
        <Square
          key={i}
          index={i}
          handleClick={props.handleClick}
          handleFlag={props.handleFlag}
          state={props.board[i]}
        />
      );
    }

    // Calculate size of board
    const width = props.columns * CELL_SIZE;
    const height = props.rows * CELL_SIZE;
    const boardStyle = {
      margin: 'auto',
      width: `${width}px`,
      height: `${height}px`,
      display: 'grid',
      gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
      border: '#20232a 1px solid'
    }

    return (
      <div style={boardStyle}>
        {squares}
      </div>
    );

}

export default Board;
