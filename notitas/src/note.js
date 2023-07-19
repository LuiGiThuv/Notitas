import React from 'react';

const Note = ({ note, onRemove, isImportant }) => {
  return (
    <div className={`note ${isImportant ? 'note-important' : ''}`}>
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.description}</p>
    </div>
  );
};

export default Note;
