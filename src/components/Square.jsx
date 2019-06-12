import React from 'react';
import { connect } from 'react-redux';
import styles from '../css-modules/Square.module.css'

function Square(props) {
  return (
    <button onClick={() => props.handleClick(props.index)} className={styles.square}>
      {props.state.revealed && props.state.value}
    </button>
  );
}

export default connect()(Square);
