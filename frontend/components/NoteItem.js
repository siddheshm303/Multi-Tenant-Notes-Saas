export default function NoteItem({ note, onDelete }) {
  return (
    <div className="note">
      <div className="note-head">
        <strong>{note.title || '(no title)'}</strong>
        <button onClick={() => onDelete(note._id)} className="btn-danger">Delete</button>
      </div>
      <p>{note.content}</p>
      <style jsx>{`
        .note { border:1px solid #ddd; padding:12px; border-radius:6px; margin-bottom:8px; }
        .note-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
        .btn-danger { background:#e53e3e; color:white; border:none; padding:6px 10px; border-radius:4px; cursor:pointer; }
      `}</style>
    </div>
  );
}
