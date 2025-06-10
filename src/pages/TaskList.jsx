import { useContext } from "react";
import TasksContext from "../contexts/TasksContext";

// components
import TaskRow from "../components/TaskRow";

export default function TaskList() {
  const { tasks } = useContext(TasksContext);
  return (
    <div>
      <div className="grid head">
        <div>Attività</div>
        <div>Status</div>
        <div>Data di creazione</div>
      </div>
      {tasks.map((t) => (
        <TaskRow key={t.id} task={t} />
      ))}
    </div>
  );
}
