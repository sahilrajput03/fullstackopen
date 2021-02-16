import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

console.log(process.env);
console.log(process.env.REACT_APP_VARIABLE_A);
console.log(process.env.REACT_APP_VARIABLE_B);

const store = createStore(reducer);

const App = (props) => {
  const good = () => {
    props.store.dispatch({
      type: "GOOD",
    });
  };
  const bad = () => {
    props.store.dispatch({
      type: "BAD",
    });
  };
  const neutral = () => {
    props.store.dispatch({
      type: "OK",
    });
  };
  const zero = () => {
    props.store.dispatch({
      type: "ZERO",
    });
  };

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={neutral}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>

      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App store={store} />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
