import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import Notes from "./components/Notes";
import NewNote from "./components/NewNote";
import VisibilityFilter from "./components/VisibilityFilter";
import { initializeNotes } from "./reducers/noteReducer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Note from './components/Note'

const App = (props) => {
  useEffect(() => {
    props.initializeNotes();
  }, [props]);

  const padding = {
    padding: 5,
  };

  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          Notes
        </Link>
        <Link style={padding} to="/createnewnote">
          Create a new Note
        </Link>
        <Link style={padding} to="/importantfilter">
          Important/ Non Important
        </Link>
        <Link style={padding} to="/login">
          Login
        </Link>
      </div>
      <Switch>
        <Route path="/note/:id">
          <Note />
        </Route>
        <Route path="/createnewnote">
          <NewNote />
        </Route>
        <Route path="/importantfilter">
          <VisibilityFilter />
        </Route>
        <Route path="/">
          <Notes />
        </Route>
      </Switch>
      <div>
        <i>Note app, Department of Alaska Sciences 2020</i>
      </div>
    </Router>
  );
};

export default connect(null, { initializeNotes })(App);
