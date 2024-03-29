import React, { useState } from "react";
const Blog = (props) => {
  // console.log('props.completeuser: ',props.completeuser)
  const loggedInUserId = props.loggedInUserId;
  const userId = props.user.id;
  const userName = props.user.name;
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

  if (userId !== loggedInUserId) {
    deletebuttonstyleobject.display = "none";
  }
  const [visible, setVisible] = useState(false);
  // const hideWhenVisibleistrue = { display: visible ? "none" : "" };
  const showWhenVisibleisfalse = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <li className="blog">
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
        <div onClick={toggleVisibility}>
          {props.title}
          <br></br>
        </div>
        {/* <div style={hideWhenVisibleistrue}>
        </div> */}
        <div style={showWhenVisibleisfalse}>
          {props.url}
          <br></br>
          {props.likes} Likes<br></br>
          Author - {props.author}
          <br></br>Added by - {userName}
          <button
            style={{
              backgroundColor: "lightblue",
              border: "2px solid blue",
              borderRadius: "20px",
              padding: "5px",
              margin: "5px",
              width: "fit-content",
              outline: "0",
            }}
            onClick={props.likePost}
          >
            Click to like
          </button>
          <button style={deletebuttonstyleobject} onClick={props.deletePost}>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};
// onClick={()=>alert(author)}
export default Blog;
