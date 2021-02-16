import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import App from "./App";
import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";

import { createNote } from "./reducers/noteReducer";
import { filterChange } from "./reducers/filterReducer";

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});

const store = createStore(reducer);

console.log(store.getState());

store.subscribe(() => console.log(store.getState()));
store.dispatch(filterChange("IMPORTANT")); // this will cause changes in the component, as logic is linked with 'state.filter'
store.dispatch(
  createNote("combineReducers forms one reduces from many simple reducers")
);

const renderApp = () => {
  ReactDOM.render(<App store={store} />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
