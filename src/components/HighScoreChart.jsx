import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchEasyHighscores, fetchMediumHighscores, fetchHardHighscores
} from '../actions/highscoreActions';
import styles from '../css-modules/HighScoreChart.module.css';

class HighScoreChart extends React.Component {
  componentDidMount() {
    this.props.fetchEasyHighscores();
    this.props.fetchMediumHighscores();
    this.props.fetchHardHighscores();
  }

  render() {
    const easyHighscores = this.props.easyHighscores.slice(0,3).map((easy, index) => (
      <li key={index}><p>{index+1}. {easy.username}</p> <p>{easy.time} seconds</p> </li>
    ));
    const mediumHighscores = this.props.mediumHighscores.slice(0,3).map((medium, index) => (
      <li key={index}><p>{index+1}. {medium.username}</p> <p>{medium.time} seconds</p> </li>
    ));
    const hardHighscores = this.props.hardHighscores.slice(0,3).map((hard, index) => (
      <li key={index}><p>{index+1}. {hard.username}</p> <p>{hard.time} seconds</p> </li>
    ));
    return (
      <div className={styles.chartWrapper} style={{display: this.props.showGame && 'none'}}>
        <div className={styles.chart}>
          <h3>Easy</h3>
          <ol>
            {easyHighscores}
          </ol>
        </div>
        <div className="clear"/>
        <div className={styles.chart}>
          <h3>Medium</h3>
          <ol>
            {mediumHighscores}
          </ol>
        </div>
        <div className="clear"/>
        <div className={styles.chart}>
          <h3>Hard</h3>
          <ol>
            {hardHighscores}
          </ol>
        </div>
      </div>
    )
  }
}

HighScoreChart.propTypes = {
  fetchEasyHighscores: propTypes.func.isRequired,
  fetchMediumHighscores: propTypes.func.isRequired,
  fetchHardHighscores: propTypes.func.isRequired
}

const mapStateToProps = state => ({
  showGame: state.game.showGame,
  easyHighscores: state.highscores.easy,
  mediumHighscores: state.highscores.medium,
  hardHighscores: state.highscores.hard
})

const functions = {
  fetchEasyHighscores,
  fetchMediumHighscores,
  fetchHardHighscores
}

export default connect(mapStateToProps, functions)(HighScoreChart);
