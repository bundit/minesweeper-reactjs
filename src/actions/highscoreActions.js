import {
  FETCH_EASY_HIGHSCORES, FETCH_MEDIUM_HIGHSCORES,
  FETCH_HARD_HIGHSCORES, DELETE_HIGHSCORE, ADD_HIGHSCORE } from '../actions/types';

export const fetchEasyHighscores = () => dispatch => {
  fetch('/api/highscores/easy')
    .then(res => res.json())
    .then(highscores => dispatch({
      type: FETCH_EASY_HIGHSCORES,
      payload: highscores
    })
  );
}

export const fetchMediumHighscores = () => dispatch => {
  fetch('/api/highscores/medium')
    .then(res => res.json())
    .then(highscores => dispatch({
      type: FETCH_MEDIUM_HIGHSCORES,
      payload: highscores
    })
  );
}

export const fetchHardHighscores = () => dispatch => {
  fetch('/api/highscores/hard')
    .then(res => res.json())
    .then(highscores => dispatch({
      type: FETCH_HARD_HIGHSCORES,
      payload: highscores
    })
  );
}

export const addHighscore = scoreData => dispatch => {
  fetch('/api/highscores', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(scoreData)
  })
    .then(res => res.json())
    .then(score => {
        dispatch({
        type: ADD_HIGHSCORE,
        payload: score
      })
    }
  );
}
