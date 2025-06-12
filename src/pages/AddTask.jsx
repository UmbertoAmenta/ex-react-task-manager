import { useRef, useState } from "react";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const descriptionRef = useRef();
  const statusRef = useRef();

  const [error, setError] = useState("");

  const symbols = "'!@#$%^&*()-_=+[]{}|;:\",.<>?/`~";

  const handleForm = (e) => {
    e.preventDefault();

    // validazione titolo
    if (!title.trim()) {
      setError("Titolo assente");
      return;
    }
    if ([...symbols].some((s) => title.includes(s))) {
      setError("Il titolo non può contenere simboli speciali.");
      return;
    }

    console.log({
      title: title,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    });

    // reset del form
    setTitle("");
    descriptionRef.current.value = "";
    statusRef.current.value = "To do";

    setError("");
  };

  return (
    <form className="newtask" onSubmit={handleForm}>
      <label>
        <div>Titolo *</div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {error && <div className="error">{error}</div>}
      </label>

      <label>
        <div>Descrizione</div>
        <textarea ref={descriptionRef}></textarea>
      </label>

      <label>
        <div>Status</div>
        <select ref={statusRef} defaultValue="To do">
          <option value="To do">To do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </label>

      <p>* campo obbligatorio</p>
      <button type="submit">Aggiungi alla lista</button>
    </form>
  );
}
