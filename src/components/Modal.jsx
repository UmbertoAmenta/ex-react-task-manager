import { createPortal } from "react-dom";

export default function Modal({
  title,
  content,
  show,
  onClose,
  onConfirm,
  confirmText = "Conferma",
}) {
  if (!show) return null;

  return createPortal(
    <div className="modal">
      <h3>{title}</h3>
      <div>{content}</div>
      <div>
        <button type="button" onClick={onClose}>
          Annulla
        </button>
        <button type="button" onClick={onConfirm}>
          {confirmText}
        </button>
      </div>
    </div>,
    document.body
  );
}
