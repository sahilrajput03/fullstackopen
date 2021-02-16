import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import anecdoteReducer from "./reducers/anecdoteReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
// const store = createStore(reducer, applyMiddleware(thunk)); earlier code without redux-devtools-extension
// redux-thunk is a redux-middleware, which must be initialized along with initialization of the store.

store.subscribe(() => console.log(store.getState())); // this is the best way to subscribe.

export default store;