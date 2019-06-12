import React from 'react';
import Square from './Square.jsx';
import { connect } from 'react-redux';
import uniqueId from 'react-html-id';

class Board extends React.Component {
  constructor(props) {
    super(props);
    uniqueId.enableUniqueIds(this);
    console.log('asdfjals');
    console.log(props.rows);
  }
  renderSquare(i) {
    return (
      <Square />
    )
  }

  toggleSquare(i) {

  }

  render() {
    const squares = [];
    for (let i = 0; i < this.props.rows; i++) {
      const row = [];
      for (let j = 0; j < this.props.columns; j++) {
        squares.push(<Square key={this.nextUniqueId()}/>);
      }
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
