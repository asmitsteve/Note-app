import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NoteForm from "../components/NoteForm";
import { createNote } from "../services/noteService";
import { getErrorMessage } from "../services/api";

export default function CreateNote() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await createNote(values);
      toast.success("Note created successfully");
      navigate("/notes");
    } catch (error) {
      toast.error(getErrorMessage(error));
      setLoading(false);
    }
  };

  return (
    <div className="page page-narrow">
      <div className="page-header">
        <div>
          <h1>Create Note</h1>
          <p className="page-sub">Write down your thoughts and save them.</p>
        </div>
      </div>

      <NoteForm onSubmit={handleSubmit} submitLabel="Save Note" loading={loading} />
    </div>
  );
}
