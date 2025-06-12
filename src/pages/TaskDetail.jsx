import { useContext } from "react";
import { useParams } from "react-router-dom";

import TasksContext from "../contexts/TasksContext";

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks } = useContext(TasksContext);

  const task = tasks.find((task) => task.id == id);

  if (!task) return <div>Task non trovata</div>;

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
          <button
            type="button"
            onClick={(e) => console.log("Task in fase di eliminazione")}
          >
            Elimina Task
          </button>
        </div>
      </div>
    </main>
  );
}
