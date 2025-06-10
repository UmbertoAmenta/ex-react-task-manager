import { useEffect, useState } from "react";
import TasksContext from "./TasksContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/tasks`);
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  console.log(tasks);
  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
}
