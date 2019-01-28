import { arrayMove } from "react-sortable-hoc";

//ACTIONS
const ADD_TO_COMIC_STRIP = "ADD_TO_COMIC_STRIP";
const REMOVE_FROM_COMIC_STRIP = "REMOVE_FROM_COMIC_STRIP";
const MOVE_COMIC_PANEL = "MOVE_COMIC_PANEL";
const CLEAR_COMIC_STRIP = "CLEAR_COMIC_STRIP";

const initialState = {
  comicStrip: [],
  stripLength: 0
};

// Reducer input === current state
// Reducer output === new state

//REDUCER
export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_COMIC_STRIP: {
      const { comicStrip } = state;
      const { url, uniqueIdentifier, comicId } = action;
      comicStrip.push({ url, uniqueIdentifier, comicId });
      return {
        ...state,
        comicStrip,
        stripLength: comicStrip.length
      };
    }
    case REMOVE_FROM_COMIC_STRIP: {
      return {
        ...state
      };
    }
    case MOVE_COMIC_PANEL: {
      const { comicStrip } = state;
      const { oldIndex, newIndex } = action;
      return {
        ...state,
        comicStrip: arrayMove(comicStrip, oldIndex, newIndex)
      };
    }
    case CLEAR_COMIC_STRIP: {
      return {
        ...state,
        comicStrip: [],
        stripLength: 0
      };
    }
    default:
      return state;
  }
}

//ACTION CREATORS
export function addToComicStrip(url, comicId, uniqueIdentifier) {
  return {
    type: ADD_TO_COMIC_STRIP,
    url,
    comicId,
    uniqueIdentifier
  };
}

export function removeFromComicStrip(url, comicId, uniqueIdentifier) {
  return {
    type: REMOVE_FROM_COMIC_STRIP,
    url,
    comicId,
    uniqueIdentifier
  };
}

export function moveComicPanel(oldIndex, newIndex) {
  return {
    type: MOVE_COMIC_PANEL,
    oldIndex,
    newIndex
  };
}

export function clearComicStrip() {
  return {
    type: CLEAR_COMIC_STRIP
  };
}
