import React, { useState, useEffect } from 'react';
import Note from './note';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [important, setImportant] = useState(false);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (event) => {
    event.preventDefault();

    if (description.trim() === '') {
      alert('La descripción es obligatoria.');
      return;
    }

    const newNote = {
      id: Date.now(),
      title,
      description,
      important,
    };

    setNotes([...notes, newNote]);
    setTitle('');
    setDescription('');
    setImportant(false);
  };

  const handleRemoveNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div>
      <h1>Notitas Adhesivas App</h1>

      <div className="container">
        <form id="note-form" onSubmit={handleAddNote}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                placeholder="Título"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <textarea
                placeholder="Descripción (obligatorio)"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>
                Importante:
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={important}
                  onChange={(e) => setImportant(e.target.checked)}
                />
              </label>
            </div>
            <div className="col-md-6 mb-3">
              <button type="submit" className="btn btn-primary">Agregar Nota</button>
            </div>
          </div>
        </form>

        <div id="notes-container" className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          {notes.map((note) => (
            <div key={note.id} className="col mb-4">
              <Note
                note={note}
                onRemove={handleRemoveNote}
                isImportant={note.important} // Pasamos la propiedad importante al componente Note
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
