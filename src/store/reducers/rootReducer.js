import { combineReducers } from "redux";
import userLogState from "./userLogState";
import users from "./users";

export default combineReducers({
  userLogState, users
});

