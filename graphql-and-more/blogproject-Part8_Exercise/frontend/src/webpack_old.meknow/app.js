import React, { useState, useEffect } from "react";
import axios from "axios";

const useNotes = (url) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios.get(url).then((response) => {
      setNotes(response.data);
    });
  }, [url]);
  return notes;
};

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  // const url = "https://blooming-atoll-75500.herokuapp.com/api/notes";
  // const url = "http://localhost:3001/notes";
  const url = BACKEND_URL;
  
  const notes = useNotes(url);

  const handleClick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };

  return (
    <div className="container">
      hello webpack {counter} clicks
      <button className="button" onClick={url}>
        press
      </button>
      <div>
        {notes.length} notes on server {BACKEND_URL}
      </div>
    </div>
  );
};

export default App;
