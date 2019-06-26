import {
  FETCH_EASY_HIGHSCORES, FETCH_MEDIUM_HIGHSCORES, FETCH_HARD_HIGHSCORES,
  DELETE_HIGHSCORE, ADD_HIGHSCORE, TOGGLE_SHOW_FORM, SAVE_TIMESTAMP
} from '../actions/types';

const initialState = {
  showForm: false,
  timestamp: null,
  gameMode: null,
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
    case ADD_HIGHSCORE:
      return state;
    case TOGGLE_SHOW_FORM:
      return {
        ...state,
        showForm: !state.showForm
      }
    case SAVE_TIMESTAMP:
      return {
        ...state,
        timestamp: action.time,
        gameMode: action.mode
      }
    default:
      return state;
  }
}
