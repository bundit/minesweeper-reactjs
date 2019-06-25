import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { addHighscore } from '../actions/highscoreActions';

class ScoreForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    }
  }

  render() {
    return (
      <div className="formWrapper" style={{display: !this.props.showForm && 'none'}}>
        <form>
          <label>Enter your name!</label><br/>
          <input
            type="text"
            name="username"
            value={this.state.username}
          /> <br/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default ScoreForm;
