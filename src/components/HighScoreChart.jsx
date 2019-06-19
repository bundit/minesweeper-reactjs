import React from 'react';
import styles from '../css-modules/HighScoreChart.module.css';

function HighScoreChart(props) {
  // fetch here

  return (
    <div className={styles.chartWrapper} style={{display: props.showGame && 'none'}}>
      <div className={styles.chart}>
        <h3>Easy</h3>
        <ol>
          <li><p>1. name</p> <p>10 seconds</p> </li>
        </ol>
      </div>
      <div className="clear"/>
      <div className={styles.chart}>
        <h3>Medium</h3>
        <ol>
        </ol>
      </div>
      <div className="clear"/>
      <div className={styles.chart}>
        <h3>Hard</h3>
        <ol>
        </ol>
      </div>
    </div>
  )
}

export default HighScoreChart;
