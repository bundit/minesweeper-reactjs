import React from 'react';
import styles from '../css-modules/HighScoreChart.module.css';

function HighScoreChart(props) {
  return (
    <div className={styles.chartWrapper} style={{display: props.showGame && 'none'}}>
      <div className={styles.chart}>
        <h3>Easy</h3>
        <ol>
        </ol>
      </div>
      <div className={styles.chart}>
        <h3>Medium</h3>
        <ol>
        </ol>
      </div>
      <div className={styles.chart}>
        <h3>Hard</h3>
        <ol>
        </ol>
      </div>
    </div>
  )
}

export default HighScoreChart;
