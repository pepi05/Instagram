import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { fetchedUserReducer, userReducer } from "../redux/reducers/userReducer";
import { postReducer } from "./reducers/postReducer";

const initialState = {};

const reducer = combineReducers({
  user: userReducer,
  posts: postReducer,
  // fetchedUser: fetchedUserReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
