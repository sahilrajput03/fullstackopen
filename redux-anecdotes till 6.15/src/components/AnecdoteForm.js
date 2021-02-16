import React from "react";
import { createAnec } from "./../reducers/anecdoteReducer";
import { notificationChange } from "./../reducers/notificationReducer";
import {connect} from 'react-redux'

const AnecdoteForm = (props) => {
  const addAnec = (event) => {
    event.preventDefault();
    const content = event.target.anecc.value;
    event.target.anecc.value = "";
    props.createAnec(content);
    props.notificationChange(`Thanks for creating >> ${content}`)
    setTimeout(() => {
      props.notificationChange("");
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnec}>
        <div>
          <input name="anecc" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  createAnec,
  notificationChange
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)