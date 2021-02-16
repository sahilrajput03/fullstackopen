import React, { useEffect } from "react";
import { useField, useResource } from "./hooks";

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3003/api/notes");
  const [persons, personService] = useResource(
    "http://localhost:3003/api/users"
  );

  // useEffect(() => {
  //   noteService.getAll().then( t => noteService.setAll(t))
  //   personService.getAll().then( t => personService.setAll(t))
  // },[]); // so you found a new better way to deal.

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      noteService.setToken(user.token)
    }
  }, [noteService])


  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    content.reset()
    // noteService.fetchAndSaveArtificially()
    noteService.setFlag(false)
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
    name.reset()
    number.reset()
    // personService.fetchAndSaveArtificially()
  };
  let contentToInput
  let nameToInput
  let numberToInput
  //bakwaas solution:----
  // {
  //   const {reset, ...contentModified} = content
  //   contentToInput = contentModified
  // }
  // {
  //   const {reset, ...nameModified} = name
  //   nameToInput = nameModified
  // }
  // {
  //   const {reset, ...numberModified} = number
  //   numberToInput = numberModified
  // }
  
  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.input} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name.input} /> <br />
        number <input {...number.input} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
