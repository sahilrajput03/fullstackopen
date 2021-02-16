// import React, { useState } from 'react'
import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'

const App = (props) => {
    // hooks code below
    // const [notes, setNotes] = useState(props.dnotes)
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState(
        'a new note...'
    )
    const [showAll, setShowAll] = useState(true)

    // useEffect code below
    const hook = () => {
        console.log('effect is asynchronous, I got late fetching notes from the server') 
        axios
          .get('http://localhost:3001/notes')
          .then(response => {
              console.log('promimse fulfilled');
            setNotes(response.data)
          })
      }

    useEffect(hook, [])
      
      console.log('render', notes.length, 'notes')

    // functional code below

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)


    // const rows = () => notes.map((_n) =>
    const rows = () => notesToShow.map((_n) =>
        <Note
            key={_n.id}
            notela={_n}
        />
    )

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length + 1,
        }

        setNotes(notes.concat(noteObject))
        setNewNote('')
        console.log(notes);
        // console.log(newNote);
    }

    const handleNoteChange = (event) => {
        // console.log(event.target.value)
        setNewNote(event.target.value)
    }

    return (
        <div>
            <h3>Notes</h3>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {rows()}
            </ul>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}
export default App