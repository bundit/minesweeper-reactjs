import React from 'react';
import Square from './Square.jsx';
import { connect } from 'react-redux';
import uniqueId from 'react-html-id';

class Board extends React.Component {
  constructor(props) {
    super(props);
    uniqueId.enableUniqueIds(this);
  }

  render() {
    const squares = [];
    let length = this.props.rows*this.props.columns;

    for (let i = 0; i < length; i++) {
      squares.push(<Square
                    key={i}
                    index={i}
                    handleClick={this.props.handleClick}
                    handleFlag={this.props.handleFlag}
                    state={this.props.board[i]}
                    />
      );
    }
    const width = this.props.columns * 25;
    const height = this.props.rows * 25;
    const boardStyle = {
      margin: 'auto',
      width: `${width}px`,
      height: `${height}px`,
      display: 'grid',
      gridTemplateColumns: `repeat(${this.props.columns}, 1fr)`,
      border: 'black 1px solid'
    }

    return (
      <div style={boardStyle}>
        {squares}
      </div>
    );
  }
}

export default Board;
