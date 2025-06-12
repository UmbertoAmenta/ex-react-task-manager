import { useEffect, useState } from "react";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

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

  const addTask = (task) => {};
  const removeTask = (taskId) => {};
  const updateTask = (taskId, updatedTask) => {};

  return { tasks, setTasks, addTask, removeTask, updateTask };
}
