import React from "react";
import { createAnecRedux } from "./../reducers/anecdoteReducer";
import { notificationChange } from "./../reducers/notificationReducer";
import { connect } from "react-redux";
import anecdoteService from "../services/anecdotesAxios";

const AnecdoteForm = (props) => {
  const addAnec = async (event) => {
    event.preventDefault();
    const content = event.target.anecc.value;
    event.target.anecc.value = "";
    const newAnec = await anecdoteService.createAnecAxios(content);
    // console.log("#######",newAnec)
    props.createAnecRedux(newAnec);

    props.notificationChange(`Thanks for creating >> ${content}`);
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
  createAnecRedux,
  notificationChange,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
