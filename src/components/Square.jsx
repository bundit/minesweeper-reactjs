import React from 'react';
import { connect } from 'react-redux';
import styles from '../css-modules/Square.module.css'

function Square(props) {
  let valueToDisplay;
  const thisSquare = props.state;
  if (!thisSquare) return <button></button>;

  if (thisSquare && thisSquare.isRevealed) {
    valueToDisplay = thisSquare.value ? thisSquare.value : null;
  }
  else if (thisSquare && thisSquare.isFlagged) {
    valueToDisplay = <img className={styles.flag} src="/favicon.ico" alt="flag"/>
  }

  const squareStyle = props.index % 2 ? styles.oddSquare : styles.evenSquare;

  return (
    <button
      className={!thisSquare.isRevealed ? squareStyle : styles.revealedSquare}
      onClick={() => props.handleClick(props.index)}
      onContextMenu={e => { e.preventDefault(); props.handleFlag(props.index);}}
    >
      {valueToDisplay === 'b' ? <i className="fa fa-bomb"/> : valueToDisplay}
    </button>
  );
}

export default connect()(Square);
