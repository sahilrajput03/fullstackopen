import React from "react";
import { useParams } from "react-router-dom";

const Note = ({ note, handleClick }) => {
  const id = useParams().id;
  console.log("id:", id);
  if (!handleClick) {
    handleClick = null;
    note = {
      content: "Are you happy or not???",
      important:false
    };
  }
  return (
    <li onClick={handleClick}>
      {note.content} <strong>{note.important ? "important" : ""}</strong>
    </li>
  );
};

export default Note;
