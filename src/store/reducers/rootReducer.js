import { combineReducers } from "redux";
import userLogState from "./userLogState";
import users from "./users";
import event from "./event";
import ticket from "./ticket";
import comment from "./comment";

export default combineReducers({
  userLogState, users, event, ticket, comment
});

