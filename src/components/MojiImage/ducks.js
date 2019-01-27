//ACTIONS
const ADD_TO_COMIC_STRIP = "ADD_TO_COMIC_STRIP";

const initialState = {
  comicStrip: {}
};

// Reducer input === current state
// Reducer output === new state

//REDUCER
export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_COMIC_STRIP: {
      const { comicStrip } = state;
      const { comicUrl, uniqueIdentifier, comicId } = action;
      comicStrip[`${comicId}_${uniqueIdentifier}`] = {
        url: comicUrl,
        key: uniqueIdentifier,
        text: ""
      };
      return {
        ...state,
        comicStrip
      };
    }
    default:
      return state;
  }
}

//ACTION CREATORS
export function addToComicStrip(comicUrl, comicId, uniqueIdentifier) {
  return {
    type: ADD_TO_COMIC_STRIP,
    comicUrl,
    comicId,
    uniqueIdentifier
  };
}
