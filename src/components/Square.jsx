import React from 'react';
import { connect } from 'react-redux';
import styles from '../css-modules/Square.module.css'

function Square(props) {
  let value;
  const thisSquare = props.state;

  if (thisSquare.isRevealed) {
    value = thisSquare.value ? thisSquare.value : null;
  }
  else if (thisSquare.isFlagged) {
    value = <img className={styles.flag} src="/favicon.ico" alt="flag"/>
  }

  return (
    <button
      className={!thisSquare.isRevealed ? styles.square : styles.revealedSquare}
      onClick={() => props.handleClick(props.index)}
      onContextMenu={e => { e.preventDefault(); props.handleFlag(props.index);}}
    >
      {value === 'b' ? <i className="fa fa-bomb"/> : value}
    </button>
  );
}

export default connect()(Square);
