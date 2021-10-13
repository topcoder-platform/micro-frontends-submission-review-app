import { combineReducers } from "redux";

import auth from "./auth";
import challenges from "./challenges";
import challengeDetails from "./challengeDetails";
import challengeSubmissions from "./challengeSubmissions";
import resources from "./resources";

export default combineReducers({
  auth,
  challenges,
  resources,
  challengeDetails,
  challengeSubmissions,
});
