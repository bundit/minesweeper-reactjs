import React from 'react';
import { connect } from 'react-redux';
import styles from '../css-modules/Square.module.css'

function Square(props) {
  return (
    <button
      className={styles.square}
      onClick={() => props.handleClick(props.index)}
      onContextMenu={e => { e.preventDefault(); props.handleFlag(props.index);}}
    >
      {props.state.revealed && props.state.value}
    </button>
  );
}

export default connect()(Square);
