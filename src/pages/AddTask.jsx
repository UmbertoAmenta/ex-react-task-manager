import { useContext, useMemo, useRef, useState } from "react";

// contexts
import TasksContext from "../contexts/TasksContext";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const descriptionRef = useRef();
  const statusRef = useRef();
  const navToList = useNavigate();

  const { addTask } = useContext(TasksContext);

  const symbols = "'!@#$%^&*()-_=+[]{}|;:\",.<>?/`~";

  const error = useMemo(() => {
    if (!title.trim()) return "Titolo assente";
    if ([...symbols].some((s) => title.includes(s))) {
      return "Il titolo non può contenere simboli speciali.";
    }
    return "";
  }, [title, symbols]);

  const handleForm = async (e) => {
    e.preventDefault();

    // validazione titolo
    if (error) return;

    const newTask = {
      title: title.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };

    try {
      navToList("/");
      await addTask(newTask);
      alert("Task creata");

      // reset del form
      setTitle("");
      descriptionRef.current.value = "";
      statusRef.current.value = "To do";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="container">
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

          {/* alternativa per le options della select */}
          {/* {["To do", "Doing", "Done"].map((value, index) => {
            <option key={index} value={value}>
              {value}
            </option>;
          })} */}
        </label>

        <p>* campo obbligatorio</p>
        <button type="submit" disabled={error}>
          Aggiungi alla lista
        </button>
      </form>
    </main>
  );
}
