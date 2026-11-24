import { Link } from "react-router-dom";
import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import { colorFromId, formatDate } from "../utils/helpers";

export default function NoteCard({ note, onDelete }) {
  const color = colorFromId(note._id);

  return (
    <article className={`note-card color-${color}`}>
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.content}</p>

      <div className="note-footer">
        <span className="note-date">
          <CalendarDays size={14} />
          {formatDate(note.createdAt)}
        </span>

        <div className="note-actions">
          <Link
            to={`/notes/${note._id}/edit`}
            className="icon-btn"
            aria-label="Edit note"
            title="Edit"
          >
            <Pencil size={16} />
          </Link>
          <button
            className="icon-btn danger"
            onClick={() => onDelete(note)}
            aria-label="Delete note"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
