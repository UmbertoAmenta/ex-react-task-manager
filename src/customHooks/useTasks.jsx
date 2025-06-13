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

  const addTask = async (task) => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(task),
    });
    const data = await res.json();

    if (data.success) {
      setTasks((tasks) => [...tasks, data.task]);
    } else {
      throw new Error(data.message);
    }
  };

  const removeTask = async (taskId) => {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, { method: "DELETE" });
    const data = await res.json();

    if (data.success) {
      setTasks((tasks) => tasks.filter((task) => task.id != taskId));
    } else {
      throw new Error(data.message);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();

    if (data.success) {
      setTasks((tasks) => tasks.map((t) => (t.id == taskId ? data.task : t)));
    } else {
      throw new Error(data.message);
    }
  };

  return { tasks, setTasks, addTask, removeTask, updateTask };
}
