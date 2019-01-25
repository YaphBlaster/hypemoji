import { combineReducers } from "redux";
import { reducer as reduxTest } from "./components/ReduxTest/ducks";
import { reducer as mojiModal } from "./components/Modal/ducks";

const rootReducer = combineReducers({ reduxTest, mojiModal });
export default rootReducer;
