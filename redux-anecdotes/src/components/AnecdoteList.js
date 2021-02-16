import React from "react";
import { connect } from "react-redux";
import { increaseVoteRedux } from "./../reducers/anecdoteReducer";
import { notificationChange } from "./../reducers/notificationReducer";
// import anecdoteAxios from "../services/anecdotesAxios";
const AnecdoteList = (props) => {
  
  const vote = (id) => {
    let { content, votes } = props.visibleAnecdotes.find(
      (item) => item.id === id
    );
    try {
      props.increaseVoteRedux(content, id, votes);
    } catch (error) {
      console.log(error.message);
    }
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
      (t) => t.content.search(new RegExp(filter, "i")) > -1
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
  increaseVoteRedux,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
