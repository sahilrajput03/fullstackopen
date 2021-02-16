import anecdoteReducer from "./reducers/anecdoteReducer.js";
// import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";

import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  // filter: filterReducer,
  notification: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => console.log(store.getState())); // this is the best way to subscribe.

export default store;
