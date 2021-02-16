import anecdotesAxios from "../services/anecdotesAxios";
import { notificationChange } from "./../reducers/notificationReducer";

const anecdoteReducer = (state = [], action) => {
  let stateTemp;
  switch (action.type) {
    case "LIKE":
      stateTemp = state.map((anec) =>
        anec.id !== action.data.id ? anec : { ...anec, votes: anec.votes + 1 }
      );
      return stateTemp.sort((a, b) => b.votes - a.votes);
    case "NEW_ANEC":
      return [...state, action.data];
    case "INIT_ANECS":
      return action.data;
    default:
      return state;
  }
};

export const createAnecRedux = ({ content, votes, id }) => {
  // highlight-line
  return {
    type: "NEW_ANEC",
    data: {
      content,
      votes,
      id,
    },
  };
};

export const increaseVoteRedux = (content, id, votes) => {
  return async (dispatch) => {
    const increasedVoteAnecdote = await anecdotesAxios.increaseVoteAxios(
      content,
      id,
      votes
    );
    if (increasedVoteAnecdote) {
      dispatch({
        type: "LIKE",
        data: { id },
      });
      dispatch(notificationChange(`You voted '${content}'`));
      setTimeout(() => {
        dispatch(notificationChange(""));
      }, 5000);
    } else {
      dispatch(notificationChange(`Your internet connection sucks..!!!`));
      setTimeout(() => {
        dispatch(notificationChange(""));
      }, 10000);
    }
  };
};

// export const increaseVoteRedux = (id) => {
//   // highlight-line
//   return {
//     type: "LIKE",
//     data: { id },
//   };
// };

// export const initializeAnecdotes = (anecs) => {
//   return {
//     type: "INIT_ANECS",
//     data: anecs,
//   };
// };

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecs = await anecdotesAxios.getAll();
    // console.log("anecdotes fetched:", anecs);
    dispatch({
      type: "INIT_ANECS",
      data: anecs,
    });
  };
};

export default anecdoteReducer;
