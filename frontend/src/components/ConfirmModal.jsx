import { AlertTriangle } from "lucide-react";
import { Spinner } from "./Loader";

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Delete",
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={loading ? undefined : onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">
          <AlertTriangle size={26} />
        </div>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={loading}>
            {loading && <Spinner size={16} />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
