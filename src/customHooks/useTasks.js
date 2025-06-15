import { useEffect, useReducer } from "react";
import tasksReducer from "../reducers/tasksReducer";

export default function useTasks() {
  const [tasks, dispatchTasks] = useReducer(tasksReducer, []);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/tasks`);
        const data = await res.json();
        dispatchTasks({ type: "LOAD_TASKS", payload: data });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const addTask = async (task) => {
    const taskExist = tasks.some((t) => t.title === task.title);
    if (taskExist) {
      throw new Error("Esiste una task con questo nome");
    }

    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(task),
    });
    const data = await res.json();

    if (data.success) {
      dispatchTasks({ type: "ADD_TASK", payload: data.task });
    } else {
      throw new Error(data.message);
    }
  };

  const removeTask = async (taskId) => {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, { method: "DELETE" });
    const data = await res.json();

    if (data.success) {
      dispatchTasks({ type: "REMOVE_TASK", payload: taskId });
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
      dispatchTasks({
        type: "REMOVE_MULTIPLE_TASKS",
        payload: fulfilledDeletions,
      });
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
    const taskToModify = tasks.find((t) => t.title === updatedTask.title);
    if (taskToModify && taskToModify.id !== updatedTask.id) {
      throw new Error("Esiste una task con questo nome");
    }

    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();

    if (data.success) {
      dispatchTasks({ type: "UPDATE_TASK", payload: Task });
    } else {
      throw new Error(data.message);
    }
  };

  return {
    tasks,
    addTask,
    removeTask,
    updateTask,
    removeMultipleTasks,
  };
}
