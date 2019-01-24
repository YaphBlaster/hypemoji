//ACTIONS
const CHANGE_VALUE = "CHANGE_VALUE";

const initialState = {
  value: 0
};

// Reducer input === current state
// Reducer output === new state

//REDUCER
export function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_VALUE: {
      return {
        ...state,
        value: action.newValue
      };
    }
    default:
      return state;
  }
}

//ACTION CREATORS
export function changeValue(newValue) {
  return {
    type: CHANGE_VALUE,
    newValue
  };
}
