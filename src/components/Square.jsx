import React from 'react';
import { connect } from 'react-redux';
import styles from '../css-modules/Square.module.css'

function Square(props) {
  let value;
  if (props.state.revealed && !props.state.flagged) {
    value = props.state.value ? props.state.value : null;
  }
  else if (props.state.flagged) {
    value = <img className={styles.flag} src="/favicon.ico" alt="flag"/>
  }

  return (
    <button
      className={!props.state.revealed ? styles.square : styles.revealedSquare}
      onClick={() => props.handleClick(props.index)}
      onContextMenu={e => { e.preventDefault(); props.handleFlag(props.index);}}
    >
      {value}
    </button>
  );
}

export default connect()(Square);
