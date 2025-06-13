import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To do");

  const editFormRef = useRef();

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "To do");
    }
  }, [task, show]);

  const handleEditForm = (e) => {
    e.preventDefault();
    onSave({
      ...task,
      title,
      description,
      status,
    });
  };

  const form = (
    <form ref={editFormRef} onSubmit={handleEditForm}>
      <label>
        <div>Titolo *</div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label>
        <div>Descrizione</div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </label>

      <label>
        <div>Status</div>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="To do">To do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </label>

      <p>* campo obbligatorio</p>
    </form>
  );

  return (
    <Modal
      title="Modifica Task"
      content={form}
      confirmText="Salva"
      onConfirm={() => editFormRef.current.requestSubmit()}
      onClose={onClose}
      show={show}
    />
  );
}
