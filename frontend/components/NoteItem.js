export default function NoteItem({ note, onDelete }) {
  return (
    <div className="note">
      <div className="note-head">
        <strong>{note.title || '(no title)'}</strong>
        <button onClick={() => onDelete(note._id)} className="btn-delete">Delete</button>
      </div>
      <p>{note.content}</p>
    </div>
  );
}
