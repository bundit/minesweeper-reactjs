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
      squares.push(<Square key={i} index={i} handleClick={this.props.handleClick} state={this.props.board[i]}/>);
    }

    const boardStyle = {
      margin: 'auto',
      width: '200px',
      height: '250px',
      display: 'grid',
      gridTemplateColumns: 'repeat(8, 1fr)',
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
