import {
  FETCH_EASY_HIGHSCORES, FETCH_MEDIUM_HIGHSCORES, FETCH_HARD_HIGHSCORES,
  DELETE_HIGHSCORE, ADD_HIGHSCORE
} from '../actions/types';

const initialState = {
  easy: [],
  medium: [],
  hard: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_EASY_HIGHSCORES:
      return {
        ...state,
        easy: action.payload
      }
    case FETCH_MEDIUM_HIGHSCORES:
      return {
        ...state,
        medium: action.payload
      }
    case FETCH_HARD_HIGHSCORES:
      return {
        ...state,
        hard: action.payload
      }
    default:
      return state;
  }
}
