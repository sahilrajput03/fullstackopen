import React from "react";
import { createAnec } from "./../reducers/anecdoteReducer";
import { notificationChange } from "./../reducers/notificationReducer";
import {connect} from 'react-redux'

const AnecdoteForm = (props) => {
  const addAnec = (event) => {
    event.preventDefault();
    const content = event.target.anecc.value;
    event.target.anecc.value = "";
    // props.store.dispatch(createAnec(content)); //old style code
    props.createAnec(content);
    // notification dispatching below..
    props.notificationChange(`Thanks for creating >> ${content}`)
    setTimeout(() => {
      // props.store.dispatch(notificationChange("")); // old style code
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
// export default AnecdoteForm;

// const mapStateToProps = (state) => {
//   return {
//     visibleNotes: notesToShow(state), 
//   }
// }

const mapDispatchToProps = {
  createAnec,
  notificationChange
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)