import { useContext } from "react";
import TasksContext from "../contexts/TasksContext";

// components
import TaskRow from "../components/TaskRow";

export default function TaskList() {
  const { tasks } = useContext(TasksContext);
  return (
    <div>
      {tasks.map((t) => (
        <TaskRow key={t.id} task={t} />
      ))}
    </div>
  );
}

// <div key={t.id} className="grid">
//   <span>{t.title}</span>
//   <span>{t.status}</span>
//   <span>{t.createdAt}</span>
// </div>
