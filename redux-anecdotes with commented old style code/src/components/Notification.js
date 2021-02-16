import React from "react";
import { connect } from "react-redux";
const Notification = (props) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  // if (props.store.getState().notification === "") { // old style code
  if (props.notification === "") {
    return <div></div>;
  }
  // return <div style={style}>{props.store.getState().notification}</div>; // old style code
  return <div style={style}>{props.notification}</div>;
};

// export default Notification;
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

// const mapDispatchToProps = {
//   toggleImportanceOf,
// }

export default connect(mapStateToProps, null)(Notification);
