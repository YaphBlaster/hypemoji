import { combineReducers } from "redux";
import { reducer as reduxTest } from "./components/ReduxTest/ducks";
import { reducer as mojiModal } from "./components/Modal/ducks";
import { reducer as mojiObjects } from "./containers/Mojis/ducks";
import { reducer as comicStrip } from "./components/MojiImage/ducks";

const rootReducer = combineReducers({
  reduxTest,
  mojiModal,
  mojiObjects,
  comicStrip
});
export default rootReducer;
