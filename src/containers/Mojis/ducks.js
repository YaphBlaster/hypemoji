//ACTIONS
const SET_MOJI_OBJECTS = "SET_MOJI_OBJECTS";

const initialState = {
  soloMojis: null,
  duoMojis: null
};

// Reducer input === current state
// Reducer output === new state

//REDUCER
export function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MOJI_OBJECTS: {
      return {
        ...state,
        soloMojis: action.soloMojis,
        duoMojis: action.duoMojis
      };
    }
    default:
      return state;
  }
}

//ACTION CREATORS
export function setMojiObjects(soloMojis, duoMojis) {
  return {
    type: SET_MOJI_OBJECTS,
    soloMojis,
    duoMojis
  };
}
