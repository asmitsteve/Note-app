import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowUpDown, Plus, Search, StickyNote } from "lucide-react";
import { getNotes, deleteNote } from "../services/noteService";
import { getErrorMessage } from "../services/api";
import SearchBar from "../components/SearchBar";
import NoteCard from "../components/NoteCard";
import ConfirmModal from "../components/ConfirmModal";
import PageLoader from "../components/Loader";

export default function Notes() {
  const [searchParams] = useSearchParams();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [sort, setSort] = useState("newest");
  const [reloadKey, setReloadKey] = useState(0);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Wait until the user stops typing before searching
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Load notes whenever the search text, sort order or reload key changes
  useEffect(() => {
    let ignore = false;

    const loadNotes = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getNotes({ search: debouncedSearch, sort });
        if (!ignore) setNotes(data);
      } catch (err) {
        if (!ignore) setError(getErrorMessage(err));
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadNotes();

    return () => {
      ignore = true;
    };
  }, [debouncedSearch, sort, reloadKey]);

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

  const isSearching = debouncedSearch.trim() !== "";

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>My Notes</h1>
          <p className="page-sub">
            {loading
              ? "Loading..."
              : `${notes.length} ${notes.length === 1 ? "note" : "notes"}${
                  isSearching ? " found" : ""
                }`}
          </p>
        </div>
        <Link to="/notes/new" className="btn btn-primary">
          <Plus size={18} />
          New Note
        </Link>
      </div>

      <div className="toolbar">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by title or content..."
        />

        <div className="sort-select">
          <ArrowUpDown size={16} />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort notes"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      {loading ? (
        <PageLoader text="Loading notes..." />
      ) : error ? (
        <div className="state-box">
          <h3>Could not load your notes</h3>
          <p>{error}</p>
          <button
            className="btn btn-primary"
            onClick={() => setReloadKey((key) => key + 1)}
          >
            Try again
          </button>
        </div>
      ) : notes.length === 0 ? (
        <div className="state-box">
          <div className="state-icon">
            {isSearching ? <Search size={28} /> : <StickyNote size={28} />}
          </div>
          <h3>{isSearching ? "No matching notes" : "No notes yet"}</h3>
          <p>
            {isSearching
              ? "Try a different word or clear the search box."
              : "Write your first note to get started."}
          </p>
          {!isSearching && (
            <Link to="/notes/new" className="btn btn-primary">
              <Plus size={18} />
              Create Note
            </Link>
          )}
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={setNoteToDelete} />
          ))}
        </div>
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
