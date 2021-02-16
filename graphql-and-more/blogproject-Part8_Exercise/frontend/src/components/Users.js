import React from "react";
import { connect } from "react-redux";

const Users = (props) => {
  const users = props.anecdotes.map((m) => m.user.name);
  const uniqueUsers = new Set(users);
  const count = [];
  uniqueUsers.forEach((val) =>
    count.push(users.filter((u) => u === val).length)
  );
  const uniqueUsersArraynotset = Array.from(uniqueUsers);
  // uniqueUsers.forEach((v, i) => console.log(`${v}: ${count[i]}`));

  return (
    <div>
      <h1>Users</h1>
      {uniqueUsersArraynotset.map((u, i) => (
        <li key={i}>{`${u} : ${count[i]}`}</li>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log('State of the store:',state)
  console.log("state object:-", state.anecdotes);
  return {
    anecdotes: state.anecdotes,
  };
};

export default connect(mapStateToProps, null)(Users);
