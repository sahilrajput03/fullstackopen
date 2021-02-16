import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  // Link,
  // Redirect,
  useParams,
  // useHistory,
} from "react-router-dom";

import axios from "axios";

const BlogSingle = (props) => {
  const buttonStyleNormal = {
    backgroundColor: "lightblue",
    border: "2px solid blue",
    borderRadius: "20px",
    padding: "5px",
    margin: "5px",
    width: "fit-content",
    outline: "0",
  };
  const idParams = useParams().id;
  const userId = props.loggedInUser.id;
  const [blog, setblog] = useState(props.blogs.find((t) => t.id === idParams));
  // blog = props.blogs.find((t) => t.id === idParams);
  if (!blog) {
    return <div></div>;
  }

  const userName = props.loggedInUser.name;
  //   let likePost;
  //   let deletePost;
  //   if (!blog) {
  //     like = props.likePost(idParams);
  //     deletePost = props.deletePost(idParams);
  //   }
  //   else {
  //     likePost = props.likePost;
  //     deletePost = props.deletePost;
  //   }

  const deletebuttonstyleobject = {
    backgroundColor: "red",
    border: "2px solid red",
    color: "white",
    borderRadius: "20px",
    padding: "5px",
    margin: "5px",
    width: "fit-content",
    outline: "0",
    display: "",
  };

  if (userId !== props.loggedInUser.id) {
    deletebuttonstyleobject.display = "none";
  }

  const [newComment, setNewComment] = useState("");

  const addComment = async () => {
    event.preventDefault();
    axios
      .post(`/api/blogs/comment/${idParams}`, {
        comment: newComment,
      })
      .then(() => {
        setNewComment("");
        // blog.comments = [blognewComment];
        // console.log("$blog:-", blog);
        let oldcomments = blog.comments;
        setblog({ ...blog, comments: [...oldcomments, newComment] });
      })
      .catch(() => console.log("posting comment failed due to some reasons."));
  };

  return (
    <div
      style={{
        backgroundColor: "lightblue",
        border: "1px solid blue",
        borderRadius: "20px",
        padding: "5px",
        margin: "5px",
        width: "fit-content",
      }}
    >
      <div>
        {blog.title}
        <br></br>
      </div>
      <div>
        {blog.url}
        <br></br>
        {blog.likes} Likes<br></br>
        Author - {blog.author}
        <br></br>Added by - {userName}
        <button style={buttonStyleNormal} onClick={props.likePost(idParams)}>
          Click to like
        </button>
        <button
          style={deletebuttonstyleobject}
          onClick={props.deletePost(idParams)}
        >
          Delete
        </button>
        <h3>Comments:-</h3>
        <form onSubmit={addComment}>
          <input
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          ></input>
          <button style={buttonStyleNormal} type="submit">
            Add Coment
          </button>
        </form>
        <br></br>
        {blog.comments.map((b) => (
          <div>{b} </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSingle;
