import React from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
// import anecdoteService from "./services/anecdotesAxios";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import { useEffect } from "react";
import { connect } from "react-redux";

const App = (props) => {
  useEffect(() => {
    // anecdoteService.getAll().then((anecs) => props.initializeAnecdotes(anecs));
    props.initializeAnecdotes();
  }, [props]);

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteForm />
      <br></br>
      <br></br>
      <AnecdoteList />
    </div>
  );
};

// export default App;
export default connect(null, { initializeAnecdotes })(App);
