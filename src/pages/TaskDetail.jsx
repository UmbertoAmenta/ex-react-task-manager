import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// context
import TasksContext from "../contexts/TasksContext";

// components
import Modal from "../components/Modal";

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks, removeTask } = useContext(TasksContext);
  const navToList = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const task = tasks.find((task) => task.id == id);

  if (!task) return <div>Task non trovata</div>;

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("Task eliminata");
      navToList("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="container detail">
      <div>
        <div className="flex">
          <h3>{task.title}</h3>
          <span
            className={
              (task.status === "To do" && "red") ||
              (task.status === "Doing" && "yellow") ||
              (task.status === "Done" && "green")
            }
          >
            {task.status}
          </span>
        </div>
        <p>{task.description}</p>
        <div className="flex">
          <span>{task.createdAt.split("T", 1)}</span>
          <button type="button" onClick={() => setShowModal(true)}>
            Elimina Task
          </button>
        </div>
      </div>

      <Modal
        title="Conferma eliminazione"
        content="Sei sicuro di voler eliminare questa task?"
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={async () => {
          setShowModal(false);
          await handleDelete();
        }}
        confirmText="Elimina"
      />
    </main>
  );
}
