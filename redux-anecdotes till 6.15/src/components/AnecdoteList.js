import React from "react";
import { connect } from "react-redux";
import { increaseVote } from "./../reducers/anecdoteReducer";
import { notificationChange } from "./../reducers/notificationReducer";

const AnecdoteList = (props) => {

  const vote = (id) => {
    let { content } = props.visibleAnecdotes.find((item) => item.id === id);
    props.increaseVote(id);
    props.notificationChange(`You voted '${content}'`);
    setTimeout(() => {
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
      (t) =>
        t.content.search(new RegExp(filter, "i")) > -1
    );
  }
};

const mapStateToProps = (state) => {
  // console.log('State of the store:',state)
  return {
    visibleAnecdotes: anecdotesToShow(state),
  };
};

const mapDispatchToProps = {
  notificationChange,
  increaseVote,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
