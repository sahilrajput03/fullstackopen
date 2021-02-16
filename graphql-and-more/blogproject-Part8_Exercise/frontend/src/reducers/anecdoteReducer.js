import blogService from "../services/blogs";

const anecdoteReducer = (state = [], action) => {
  let stateTemp;
  switch (action.type) {
    case "LIKE":
      stateTemp = state.map((anec) =>
        anec.id !== action.data.id ? anec : { ...anec, likes: anec.likes + 1 }
      );
      return stateTemp.sort((a, b) => b.likes - a.likes);
    case "NEW_ANEC":
      return [...state, action.data];
    case "INIT_ANECS":
      return action.data.sort((a, b) => b.likes - a.likes);
    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecs = await blogService.getAll();
    dispatch({
      type: "INIT_ANECS",
      data: anecs,
    });
  };
};

export const updateBlog = (id, changedBlog) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.update(id, changedBlog);
    // .then((returnedBlog) => {
    //   setBlogs(blogs.map((blog) => (blog.id !== id ? blog : changedBlog)));
    //   // we're not settin the returned blog to this bcoz it doesn't have the user object populated in it when got received from the backend.
    //   // setreadyToFetch(true); // loading blogs again will sort them according to likes of blogs.
    // })
    // .catch(() => {
    //   setErrorMessage(`Network failed. Turn on your mobile data.`);
    //   setTimeout(() => {
    //     setErrorMessage(null);
    //   }, 2000);
    //   // setNotes(blogs.filter((n) => n.id !== id));
    // })
    dispatch({ type: "LIKE", data: { id } });
  };
};

export const addNewBlog = (noteObject) => {
  return async (dispatch) => {
    const data = await blogService.create(noteObject);
    // setBlogs(blogs.concat(data));

    dispatch({ type: "NEW_ANEC", data: data });
  };
};

export default anecdoteReducer;
