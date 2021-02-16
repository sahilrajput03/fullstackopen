// import React, { useState } from 'react'
import noteService from './services/notes'
import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import './index.css'



const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
        // align: 'center'
    }

    return (
        <div align="center" style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki 2019</em>
        </div>
    )
}


const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="error">
            {message}
        </div>
    )
}


const App = (props) => {
    // const [notes, setNotes] = useState(props.dnotes)
    const [newNote, setNewNote] = useState('')
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    // useEffect code below
    const hook = () => {
        // console.log('effect is asynchronous, I got late fetching notes from the server')
        noteService
            .getAll()
            .then(response => {
                console.log(response);
                // console.log('promimse fulfilled');
                setNotes(response)
            })
    }
    useEffect(hook, [])

    // functional code below

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)

    const toggleImportanceof = (id) => {
        console.log(`Importance of ${id} needs to be changed as you clicked the button.`);
        // const url = `http://localhost:3001/notes/${id}`
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }
        // axios.put(url,changedNote).then(response=>{
        noteService
            .update(id, changedNote)
            .then(response => {
                setNotes(notes.map(note => note.id !== id ? note : response))
            })
            .catch(error => {
                console.log("catch-error-body-inside")
                // alert(`the note "${note.content}" was already deleted from server`)
                setErrorMessage(`Note "${note.content}" was already deleted from server`)
                setTimeout(() => {setErrorMessage(null)}, 5000)

                setNotes(notes.filter(n => n.id !== id))
            })
        console.log(changedNote.important);
    }

    // const rows = () => notes.map((note) =>
    const rows = () => notesToShow.map((note) =>
        <Note
            key={note.id}
            note={note}
            toggleImportance={() => (toggleImportanceof(note.id))}
        />
    )

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length + 1 // id's are generated automatically.
        }

        // axios.post('http://localhost:3001/notes', noteObject)
        noteService.create(noteObject)
            .then(response => {
                console.log(response)
                setNotes(notes.concat(response))
                setNewNote('')
            })
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    return (
        <div>
            <h1 align="center">Notes</h1>

            <Notification message={errorMessage} />

            <div>
                <button className='buttonCustom floatLeft' onClick={() => setShowAll(!showAll)}>
                    Show {showAll ?  'important' : 'all'}
                </button>
            </div>
            <br></br><p></p>
            <div align="center">
                <form onSubmit={addNote}>
                    <input
                        className='inputField'
                        value={newNote}
                        onChange={handleNoteChange}
                        placeholder="Type your note here.."
                    />
                    <button className='buttonCustom' type="submit">save</button>
                </form>
            </div>
            <br></br>
            <ul>
                {rows()}
            </ul>

            <Footer />
        </div>
    )
}
export default App