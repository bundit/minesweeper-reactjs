// Import actions
import { CONFIGURE_NEW_BOARD, START_CLOCK, INCREMENT_TIME, RESTART_BOARD } from '../actions/types';

const initialState = {
  hasStarted: false,
  seconds: 0
};

function timerReducer(state = initialState, action) {
  switch (action.type) {
    case CONFIGURE_NEW_BOARD:
      return {...initialState};
    case START_CLOCK:
      return {
        ...state,
        hasStarted: true
      }
    case INCREMENT_TIME:
      const gameHasStarted = state.hasStarted;

      return gameHasStarted ? {
        ...state,
        seconds: state.seconds + 1
      } : state;
    case RESTART_BOARD:
      return {...initialState}
    default:
      return state;
  }
}

export default timerReducer;
