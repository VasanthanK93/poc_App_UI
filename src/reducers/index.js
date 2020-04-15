import { combineReducers } from "redux";
import pocReducer from "./pocReducer";

export default combineReducers({
    pocs: pocReducer
});