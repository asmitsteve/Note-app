import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, X } from "lucide-react";
import { Spinner } from "./Loader";

const TITLE_MAX = 100;

export default function NoteForm({
  initialValues,
  onSubmit,
  submitLabel = "Save Note",
  loading = false,
}) {
  const navigate = useNavigate();
  const start = initialValues || { title: "", content: "" };

  const [title, setTitle] = useState(start.title);
  const [content, setContent] = useState(start.content);
  const [errors, setErrors] = useState({});

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Please enter a title";
    } else if (title.trim().length > TITLE_MAX) {
      newErrors.title = `Title must be ${TITLE_MAX} characters or fewer`;
    }

    if (!content.trim()) {
      newErrors.content = "Please write something in your note";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ title: title.trim(), content: content.trim() });
  };

  return (
    <form className="card note-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="title">Title</label>
        <div className={`input-wrap ${errors.title ? "has-error" : ""}`}>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your note a title"
            maxLength={TITLE_MAX + 20}
          />
        </div>
        <div className="field-meta">
          {errors.title ? <p className="field-error">{errors.title}</p> : <span />}
          <span className="counter">
            {title.length}/{TITLE_MAX}
          </span>
        </div>
      </div>

      <div className="field">
        <label htmlFor="content">Description</label>
        <div className={`input-wrap textarea-wrap ${errors.content ? "has-error" : ""}`}>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your thoughts here..."
            rows={12}
          />
        </div>
        <div className="field-meta">
          {errors.content ? <p className="field-error">{errors.content}</p> : <span />}
          <span className="counter">
            {wordCount} words · {content.length} characters
          </span>
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => navigate("/notes")}
          disabled={loading}
        >
          <X size={18} />
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <Spinner size={18} /> : <Save size={18} />}
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
