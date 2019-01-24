import { combineReducers } from "redux";
import { reducer as reduxTest } from "./components/ReduxTest/ducks";

const rootReducer = combineReducers({ reduxTest });
export default rootReducer;
