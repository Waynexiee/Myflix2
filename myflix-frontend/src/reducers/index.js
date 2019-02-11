import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import categoryReducer from "./videoReducer";
import queueItemReducer from "./queueItemReducer";
import friendshipReducer from "./friendshipReducer";
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  categories: categoryReducer,
  queue_items: queueItemReducer,
  followings: friendshipReducer,
  user: userReducer
});
