import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { addHighscore } from '../actions/highscoreActions';
import { TOGGLE_SHOW_FORM, CONFIGURE_NEW_BOARD } from '../actions/types';
// CSS
import styles from '../css-modules/ScoreForm.module.css';


class ScoreForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    }

    this.onChange = this.onChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();

    if (this.state.username.length > 10){
      alert('Pick a shorter name');
      return;
    }


    const scorePost = {
      username: this.state.username,
      time: this.props.time,
      mode: this.props.mode
    }
    this.props.addHighscore(scorePost);
    this.props.dispatch({type: TOGGLE_SHOW_FORM});
    this.props.dispatch({type: CONFIGURE_NEW_BOARD});
  }
  handleCancel() {
    this.props.dispatch({type: TOGGLE_SHOW_FORM});
  }
  render() {
    return (
      <div className={styles.formWrapper} style={{display: !this.props.showForm && 'none'}}>
        <form onSubmit={this.onSubmit}>
          <div className={styles.formTitleWrapper}>
            <h4>Add Your Highscore!</h4>
          </div>
          <div className={styles.form}>
            <label>Name:</label><br/>
            <input
              type="text"
              name="username"
              onChange={this.onChange}
              value={this.state.username}
            /> <br/>
            <div>
              <button type="submit">Submit</button>
              <button onClick={() => this.handleCancel}> Cancel</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

ScoreForm.propTypes = {
  addHighscore: propTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    addHighscore: score => dispatch(addHighscore(score))
  }
}

export default connect(null, mapDispatchToProps)(ScoreForm);
