import { combineReducers } from 'redux';
import timerReducer from './timerReducer';
import gameReducer from './gameReducer';
import highscoresReducer from './highscoresReducer';

export default combineReducers({
  timer: timerReducer,
  game: gameReducer,
  highscores: highscoresReducer
});
