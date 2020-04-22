import { combineReducers } from "redux";
import pocReducer from "./pocReducer";
import userReducer from "./userReducer"

export default combineReducers({
    pocs: pocReducer,
    users: userReducer
});