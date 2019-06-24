// Import actions

const initialState = {
  hasStarted: false,
  seconds: 0
};

function timerReducer(state = initialState, action) {
  switch (action.type) {
    case "CONFIGURE-NEW-BOARD":
      return {...initialState};
    case "START-CLOCK":
      return {
        ...state,
        hasStarted: true
      }
    case "INCREMENT-TIME":
      return {
        ...state,
        seconds: ++state.seconds
      }
    case "RESTART-BOARD":
      return {...initialState}
    default:
      return state;
  }
}

export default timerReducer;
