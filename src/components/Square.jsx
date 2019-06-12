import React from 'react';
import { connect } from 'react-redux';
import styles from '../css-modules/Square.module.css'

function Square() {
  return (
    <button className={styles.square}>
      <div/>
    </button>
  );
}

export default connect()(Square);
