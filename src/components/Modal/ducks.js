//ACTIONS
const SET_PRIMARY_MOJI = 'SET_PRIMARY_MOJI';
const SET_SECONDARY_MOJI = 'SET_SECONDARY_MOJI';

const initialState = {
  primaryMoji: '',
  secondaryMoji: ''
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
    case SET_SECONDARY_MOJI: {
      return {
        ...state,
        secondaryMoji: action.mojiID
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

export function setSecondaryMoji(mojiID) {
  return {
    type: SET_SECONDARY_MOJI,
    mojiID
  };
}

//SELECTORS
export const primaryMojiSelector = state => state.mojiModal.primaryMoji;
export const secondaryMojiSelector = state => state.mojiModal.secondaryMoji;
