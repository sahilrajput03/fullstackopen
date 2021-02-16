import React from "react";
import { connect } from "react-redux";
import { increaseVote } from "./../reducers/anecdoteReducer";
import { notificationChange } from "./../reducers/notificationReducer";

const AnecdoteList = (props) => {
  // const { anecdotes, filter } = props.store.getState(); // old style code

  const vote = (id) => {
    // let [{content}] = anecdotes.filter((item) => item.id === id) // old style code..
    let { content } = props.visibleAnecdotes.find((item) => item.id === id);
    console.log("vote", id);
    // props.store.dispatch(increaseVote(id));
    props.increaseVote(id);
    // props.store.dispatch(notificationChange(`You voted '${content}'`)); // old style code
    props.notificationChange(`You voted '${content}'`);
    setTimeout(() => {
      // props.store.dispatch(notificationChange(""));
      props.notificationChange("");
    }, 5000);
  };

  return (
    <div>
      {props.visibleAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const anecdotesToShow = ({ anecdotes, filter }) => {
  if (filter === "ALL") {
    return anecdotes;
  } else {
    return anecdotes.filter(
      // (t) => t.content.indexOf(props.store.getState().filter) > -1
      (t) =>
        // t.content.search(new RegExp(props.store.getState().filter, "i")) > -1 // old style code
        t.content.search(new RegExp(filter, "i")) > -1
    );
  }
};

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state),
  };
};

const mapDispatchToProps = {
  notificationChange,
  increaseVote,
};

// export default AnecdoteList;
export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
