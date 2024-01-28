import { useState } from "react";
import PropTypes from "prop-types";

function NoteForm({ addNote }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNote = {
            id: Date.now(),
            title,
            content,
            favorite: false,
        };
        addNote(newNote);
        setTitle("");
        setContent("");
    };

    return (
        <form className="note-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="note-form__input"
            />
            <textarea
                placeholder="Contenido"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="note-form__textarea"
            />
            <button type="submit" className="note-form__button">Agregar Nota</button>
        </form>
    );
}

NoteForm.propTypes = {
    addNote: PropTypes.func.isRequired
};
export default NoteForm;
