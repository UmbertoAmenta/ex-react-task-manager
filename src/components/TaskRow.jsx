import React from "react";
import { Link } from "react-router-dom";

function TaskRow({ task, checked = false, onToggle }) {
  return (
    <div className="grid">
      <span>
        <input
          className="selection"
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(task.id)}
        />
        <Link to={`/task/${task.id}`}>{task.title}</Link>
      </span>
      <span
        className={
          (task.status === "To do" && "red") ||
          (task.status === "Doing" && "yellow") ||
          (task.status === "Done" && "green")
        }
      >
        {task.status}
      </span>

      <span>{task.createdAt.split("T", 1)}</span>

      {/* alternativa */}
      {/* <span>{task.createdAt.replace(/T|Z|\.\d+/g, " ")}</span> */}
    </div>
  );
}

export default React.memo(TaskRow);
