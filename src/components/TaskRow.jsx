import React from "react";

function TaskRow({ task }) {
  return (
    <div className="grid">
      <span>{task.title}</span>
      <span
        className={
          (task.status === "To do" && "red") ||
          (task.status === "Doing" && "yellow") ||
          (task.status === "Done" && "green")
        }
      >
        {task.status}
      </span>
      <span>{task.createdAt.replace(/T|Z|\.\d+/g, " ")}</span>
    </div>
  );
}

export default React.memo(TaskRow);
