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

  const removeMultipleTasks = async (tasksIds) => {
    const removePromise = async (taskId) => {
      try {
        const res = await fetch(`${API_URL}/tasks/${taskId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success === false) {
          throw new Error(
            `Errore ${res.status}: impossibile eliminare task ${taskId}`
          );
        }
        return { id: taskId, success: data.success };
      } catch (error) {
        return { id: taskId, error: error.message };
      }
    };

    const promises = tasksIds.map(removePromise);
    const results = await Promise.allSettled(promises);

    const fulfilledDeletions = [];
    const rejectedDeletions = [];

    results.forEach((r, i) => {
      const taskId = tasksIds[i];
      if (r.status === "fulfilled" && r.value.success) {
        fulfilledDeletions.push(taskId);
      } else {
        rejectedDeletions.push(taskId);
      }
    });

    if (fulfilledDeletions.length > 0) {
      setTasks((tasks) =>
        tasks.filter((t) => !fulfilledDeletions.includes(t.id))
      );
    }

    if (rejectedDeletions.length > 0) {
      throw new Error(
        `Errore con l'eliminazione delle tasks con id:${rejectedDeletions.join(
          ", "
        )}`
      );
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

  return {
    tasks,
    setTasks,
    addTask,
    removeTask,
    updateTask,
    removeMultipleTasks,
  };
}
