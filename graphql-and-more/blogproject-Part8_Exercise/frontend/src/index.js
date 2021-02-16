import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
//Order of Provider and Router in React app? => It does not matter.
/* They don’t depend on each other.
Take a look at their implementations, specifically at their render methods.
Redux Provider, React Router.
They mostly just declare couple of contextTypes, and render children. */