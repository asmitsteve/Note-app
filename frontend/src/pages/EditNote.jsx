import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import NoteForm from "../components/NoteForm";
import PageLoader from "../components/Loader";
import { getNote, updateNote } from "../services/noteService";
import { getErrorMessage } from "../services/api";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadNote = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getNote(id);
        if (!ignore) setNote(data);
      } catch (err) {
        if (!ignore) setError(getErrorMessage(err));
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadNote();

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      await updateNote(id, values);
      toast.success("Note updated successfully");
      navigate("/notes");
    } catch (err) {
      toast.error(getErrorMessage(err));
      setSaving(false);
    }
  };

  return (
    <div className="page page-narrow">
      <div className="page-header">
        <div>
          <h1>Edit Note</h1>
          <p className="page-sub">Make changes and save them.</p>
        </div>
      </div>

      {loading ? (
        <PageLoader text="Loading note..." />
      ) : error ? (
        <div className="state-box">
          <h3>Could not open this note</h3>
          <p>{error}</p>
          <Link to="/notes" className="btn btn-primary">
            Back to notes
          </Link>
        </div>
      ) : (
        <NoteForm
          initialValues={{ title: note.title, content: note.content }}
          onSubmit={handleSubmit}
          submitLabel="Update Note"
          loading={saving}
        />
      )}
    </div>
  );
}
