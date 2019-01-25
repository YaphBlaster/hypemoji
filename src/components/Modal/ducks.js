//ACTIONS
const SET_PRIMARY_MOJI = "SET_PRIMARY_MOJI";

const initialState = {
  primaryMoji: ""
};

// Reducer input === current state
// Reducer output === new state

//REDUCER
export function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRIMARY_MOJI: {
      return {
        ...state,
        primaryMoji: action.mojiID
      };
    }
    default:
      return state;
  }
}

//ACTION CREATORS
export function setPrimaryMoji(mojiID) {
  return {
    type: SET_PRIMARY_MOJI,
    mojiID
  };
}
