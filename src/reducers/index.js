import { combineReducers } from "redux";
import pocReducer from "./pocReducer";
import userReducer from "./userReducer";
import commonReducer from "./commonReducer";

export default combineReducers({
    pocs: pocReducer,
    users: userReducer,
    common: commonReducer
});