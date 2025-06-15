import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// context
import TasksContext from "../contexts/TasksContext";

// components
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks, removeTask, updateTask } = useContext(TasksContext);
  const navToList = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const task = tasks.find((task) => task.id == id);

  if (!task) return <h2>Task non trovata</h2>;

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("Task eliminata");
      navToList("/");
      // useNavigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = async (updatedTask) => {
    try {
      await updateTask(task.id, updatedTask);
      alert("Task modificata");
      setShowEditModal(false);
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
          <button type="button" onClick={() => setShowEditModal(true)}>
            Modifica Task
          </button>
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

      <EditTaskModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        task={task}
        onSave={handleEdit}
      />
    </main>
  );
}
