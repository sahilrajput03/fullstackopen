import React from "react";

const Notification = ({ message }) => {
  // console.log("messs:", message);
  if (!message) {
    return <div></div>;
  }
  return <div className="error">{message}</div>;
};

export default Notification;
