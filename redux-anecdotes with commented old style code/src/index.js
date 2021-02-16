import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import App from "./App";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";
import { Provider } from "react-redux";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer,
});

const store = createStore(reducer);

ReactDOM.render(<Provider store={store} ><App/></Provider>, document.getElementById("root"));

// const render = () => {
// ReactDOM.render(<App store={store} />, document.getElementById("root"));
// };

// render();
// store.subscribe(render);
// store.subscribe(() => console.log(store.getState()));
