// contexts
import TasksContext from "./TasksContext";

// custom hooks
import useTasks from "../customHooks/useTasks";

export default function TasksProvider({ children }) {
  const tasksHandler = useTasks();

  return (
    <TasksContext.Provider value={tasksHandler}>
      {children}
    </TasksContext.Provider>
  );
}
