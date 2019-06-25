import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { addHighscore } from '../actions/highscoreActions';
import styles from '../css-modules/ScoreForm.module.css';

class ScoreForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    }
  }

  render() {
    return (
      <div className={styles.formWrapper} style={{display: !this.props.showForm && 'none'}}>
        <form>
          <div className={styles.formTitleWrapper}>
            <h4>Add Your Highscore!</h4>
          </div>
          <div className={styles.form}>
            <label>Name:</label><br/>
            <input
              type="text"
              name="username"
              value={this.state.username}
            /> <br/>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default ScoreForm;
