import React from 'react';
import { connect } from 'react-redux';
import styles from '../css-modules/Square.module.css'

function Square(props) {
  let value = props.state.value ? props.state.value : null;
  return (
    <button
      className={!props.state.revealed && styles.square}
      onClick={() => props.handleClick(props.index)}
      onContextMenu={e => { e.preventDefault(); props.handleFlag(props.index);}}
    >
      {props.state.revealed && !props.state.flagged && value}
    </button>
  );
}

export default connect()(Square);
