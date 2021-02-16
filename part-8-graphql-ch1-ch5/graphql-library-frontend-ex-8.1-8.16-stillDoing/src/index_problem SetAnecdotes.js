import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = (props) => {
  //console.log(props);
  let [selected, setSelected] = useState(0);
  const [allPoints, setPoints] = useState(() => Array(props.anecdotes.length).fill(0));
  //console.log(allPoints);

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * 6));
  };
  //console.log(selected);

  const handleVotes = () => {
    // tally vote to anecdote in array
    const copy = [...allPoints];
    copy[selected] += 1;
    setPoints(copy);

    console.log(copy[selected]);
  };

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>has {allPoints[selected]} votes </p>
      <Button onClick={handleVotes} text="vote" />
      <Button onClick={handleNext} text="next anecdote" />
    </div>
  );
};
// <p>has {props.copy[selected]} votes</p>

// const points = [1, 4, 6, 3]

// const copy = [...points]
// // increment the value in position 2 by one
// copy[2] += 1

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));

// import React, { useState } from "react";
// import ReactDOM from "react-dom";

// const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

// const App = (props) => {
//   let [selected, setSelected] = useState(0);
//   const [allPoints, setPoints] = useState(() => Array(props.anecdotes.length).fill(0));
//   // const copy = [...allPoints];

//   const handleNext = () => {
//     setSelected(Math.floor(Math.random() * 6));
//   };

//   const handleVotes = () => {
//     const copy = [...allPoints];
//     copy[selected] = copy[selected] + 1;
//     setPoints(copy);
//   };

//   return (
//     <div>
//       <p>{props.anecdotes[selected]}</p>
//       <p>has {allPoints[selected]} votes </p>
//       <Button onClick={handleVotes} text="vote" />
//       <Button onClick={handleNext} text="next anecdote" />
//     </div>
//   );
// };
// const anecdotes = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
