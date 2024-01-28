import { useState } from "react";
import PropTypes from "prop-types";

function NoteList({ notes, editNote, deleteNote, toggleFavorite }) {
    const [editedTitle, setEditedTitle] = useState("");
    const [editedContent, setEditedContent] = useState("");

    const handleEditTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleEditContentChange = (e) => {
        setEditedContent(e.target.value);
    };

    const handleEditSubmit = (note) => {
        editNote({
            ...note,
            title: editedTitle || note.title,
            content: editedContent || note.content,
            editing: false,
        });
        setEditedTitle("");
        setEditedContent("");
    };

    return (
        <div>
            {notes.map((note) => (
                <div key={note.id} className="note">
                    <h3>{note.editing ? (
                        <input
                            value={editedTitle || note.title}
                            onChange={handleEditTitleChange}
                            placeholder="Nuevo título"
                        />
                    ) : (
                        note.title
                    )}</h3>
                    {note.editing ? (
                        <div>
                            <textarea
                                value={editedContent || note.content}
                                onChange={handleEditContentChange}
                                placeholder="Nuevo contenido"
                            />
                            <button onClick={() => handleEditSubmit(note)}>Guardar</button>
              
                        </div>
                    ) : (
                        <p>{note.content}</p>
                    )}
                    <br />
                    <button onClick={() => editNote({ ...note, editing: !note.editing })}>
            Editar
                    </button>
                    <button onClick={() => deleteNote(note.id)}>Eliminar</button>
                    <button onClick={() => toggleFavorite(note.id)}>
                        {note.favorite ? "Quitar Favorita" : "Marcar como Favorita"}
                    </button>
                </div>
            ))}
        </div>
    );
}


NoteList.propTypes = {
    notes: PropTypes.array.isRequired,
    editNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    toggleFavorite: PropTypes.func.isRequired
};

export default NoteList;
