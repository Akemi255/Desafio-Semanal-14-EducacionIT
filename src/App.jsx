
import "./app.scss";
import { useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function App() {
    const [notes, setNotes] = useState([]);
    const [favoriteNotes, setFavoriteNotes] = useState([]);

    const addNote = (newNote) => {
        setNotes([...notes, newNote]);
    };

    const editNote = (editedNote) => {
        const updatedNotes = notes.map((note) =>
            note.id === editedNote.id ? editedNote : note
        );
        setNotes(updatedNotes);
        if (editedNote.favorite) {
            const updatedFavoriteNotes = favoriteNotes.map((note) =>
                note.id === editedNote.id ? editedNote : note
            );
            setFavoriteNotes(updatedFavoriteNotes);
        }
    };

    const deleteNote = (id) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        const updatedFavoriteNotes = favoriteNotes.filter((note) => note.id !== id);
        setFavoriteNotes(updatedFavoriteNotes);
    };

    const toggleFavorite = (id) => {
        const noteToToggle = notes.find((note) => note.id === id);

        const updatedNotes = notes.map((note) =>
            note.id === id ? { ...note, favorite: !note.favorite } : note
        );

        setNotes(updatedNotes);

        if (!noteToToggle.favorite) {
            setFavoriteNotes([...favoriteNotes, noteToToggle]);
        } else {
            const updatedFavoriteNotes = favoriteNotes.filter(
                (note) => note.id !== id
            );
            setFavoriteNotes(updatedFavoriteNotes);
        }
    };

    return (
        <div className="App">
            <h1>Notas App</h1>
            <NoteForm addNote={addNote} />
            <h2>Todas las Notas</h2>
            <NoteList
                notes={notes}
                editNote={editNote}
                deleteNote={deleteNote}
                toggleFavorite={toggleFavorite}
            />

            <br />
            <h2>Notas Favoritas</h2>
            <NoteList
                notes={favoriteNotes}
                editNote={editNote}
                deleteNote={deleteNote}
                toggleFavorite={toggleFavorite}
            />
        </div>
    );
}

export default App;
