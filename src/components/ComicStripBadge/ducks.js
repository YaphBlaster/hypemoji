import { arrayMove } from "react-sortable-hoc";

//ACTIONS
const ADD_TO_COMIC_STRIP = "ADD_TO_COMIC_STRIP";
const REMOVE_FROM_COMIC_STRIP = "REMOVE_FROM_COMIC_STRIP";
const MOVE_COMIC_PANEL = "MOVE_COMIC_PANEL";
const CLEAR_COMIC_STRIP = "CLEAR_COMIC_STRIP";
const UPDATE_COMIC_TEXT = "UPDATE_COMIC_TEXT";
const PROCESS_COMIC_STRIP = "PROCESS_COMIC_STRIP";

export const initialState = {
  comicStrip: [],
  stripLength: 0,
  processingComicStrip: false
};

// Reducer input === current state
// Reducer output === new state

//REDUCER
export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_COMIC_STRIP: {
      const { comicStrip } = state;
      const { url, uniqueIdentifier, comicId } = action;
      comicStrip.push({
        url,
        uniqueIdentifier,
        comicId,
        text: ""
      });
      return {
        ...state,
        comicStrip,
        stripLength: comicStrip.length
      };
    }
    case REMOVE_FROM_COMIC_STRIP: {
      const { uniqueIdentifier } = action;
      const { comicStrip } = state;
      let newComicStrip = [];
      for (let index = 0; index < comicStrip.length; index++) {
        if (uniqueIdentifier !== comicStrip[index].uniqueIdentifier) {
          newComicStrip.push(comicStrip[index]);
        }
      }
      return {
        ...state,
        comicStrip: newComicStrip,
        stripLength: newComicStrip.length
      };
    }
    case MOVE_COMIC_PANEL: {
      const { comicStrip } = state;
      const { oldIndex, newIndex } = action;
      if (oldIndex === newIndex) return state;
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
    case UPDATE_COMIC_TEXT: {
      const { comicStrip } = state;
      const { uniqueIdentifier } = action;

      for (let index = 0; index < comicStrip.length; index++) {
        if (uniqueIdentifier === comicStrip[index].uniqueIdentifier) {
          comicStrip[index].text = action.text.toUpperCase();

          return {
            ...state,
            comicStrip
          };
        }
      }
      return {
        ...state
      };
    }
    case PROCESS_COMIC_STRIP: {
      return {
        ...state,
        processingComicStrip: action.isProcessing
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

export function removeFromComicStrip(uniqueIdentifier) {
  return {
    type: REMOVE_FROM_COMIC_STRIP,
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

export function updateComicText(uniqueIdentifier, text) {
  return {
    type: UPDATE_COMIC_TEXT,
    uniqueIdentifier,
    text
  };
}

export function setProcessingComicStrip(isProcessing) {
  return {
    type: PROCESS_COMIC_STRIP,
    isProcessing
  };
}
