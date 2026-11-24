import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CalendarDays, Clock, Plus, StickyNote } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getNotes, deleteNote } from "../services/noteService";
import { getErrorMessage } from "../services/api";
import { getGreeting, timeAgo } from "../utils/helpers";
import SearchBar from "../components/SearchBar";
import NoteCard from "../components/NoteCard";
import ConfirmModal from "../components/ConfirmModal";
import PageLoader from "../components/Loader";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadNotes = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getNotes({ sort: "newest" });
      setNotes(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleSearch = (value) => {
    const text = value.trim();
    navigate(text ? `/notes?search=${encodeURIComponent(text)}` : "/notes");
  };

  const confirmDelete = async () => {
    if (!noteToDelete) return;
    setDeleting(true);
    try {
      await deleteNote(noteToDelete._id);
      setNotes((prev) => prev.filter((n) => n._id !== noteToDelete._id));
      toast.success("Note deleted");
      setNoteToDelete(null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const notesThisWeek = notes.filter(
    (n) => new Date(n.createdAt).getTime() >= weekAgo
  ).length;

  const lastUpdated = notes.length
    ? notes.reduce((latest, n) =>
        new Date(n.updatedAt) > new Date(latest.updatedAt) ? n : latest
      ).updatedAt
    : null;

  const recentNotes = notes.slice(0, 6);
  const firstName = user && user.name ? user.name.split(" ")[0] : "there";

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>
            {getGreeting()}, {firstName} 👋
          </h1>
          <p className="page-sub">Here is a quick look at your workspace.</p>
        </div>
        <Link to="/notes/new" className="btn btn-primary">
          <Plus size={18} />
          Create Note
        </Link>
      </div>

      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={handleSearch}
        placeholder="Search your notes and press Enter..."
      />

      {loading ? (
        <PageLoader text="Loading your dashboard..." />
      ) : error ? (
        <div className="state-box">
          <h3>Could not load your notes</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={loadNotes}>
            Try again
          </button>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon purple">
                <StickyNote size={22} />
              </div>
              <div>
                <span className="stat-label">Total notes</span>
                <strong className="stat-value">{notes.length}</strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon blue">
                <CalendarDays size={22} />
              </div>
              <div>
                <span className="stat-label">Created this week</span>
                <strong className="stat-value">{notesThisWeek}</strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                <Clock size={22} />
              </div>
              <div>
                <span className="stat-label">Last activity</span>
                <strong className="stat-value small">
                  {lastUpdated ? timeAgo(lastUpdated) : "No notes yet"}
                </strong>
              </div>
            </div>
          </div>

          <div className="section-row">
            <h2>Recent notes</h2>
            {notes.length > 0 && (
              <Link to="/notes" className="link">
                View all
              </Link>
            )}
          </div>

          {recentNotes.length === 0 ? (
            <div className="state-box">
              <div className="state-icon">
                <StickyNote size={28} />
              </div>
              <h3>No notes yet</h3>
              <p>Create your first note and it will show up here.</p>
              <Link to="/notes/new" className="btn btn-primary">
                <Plus size={18} />
                Create your first note
              </Link>
            </div>
          ) : (
            <div className="notes-grid">
              {recentNotes.map((note) => (
                <NoteCard key={note._id} note={note} onDelete={setNoteToDelete} />
              ))}
            </div>
          )}
        </>
      )}

      <ConfirmModal
        open={Boolean(noteToDelete)}
        title="Delete this note?"
        message={
          noteToDelete
            ? `"${noteToDelete.title}" will be permanently deleted. This cannot be undone.`
            : ""
        }
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setNoteToDelete(null)}
      />
    </div>
  );
}
