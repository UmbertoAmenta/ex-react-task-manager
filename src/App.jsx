import { Route, Routes, BrowserRouter } from "react-router-dom";

// Contexts and providers
import TasksProvider from "./contexts/TasksProvider";
// Layouts
import DefaultLayout from "./Layouts/DefaultLayout";

// Pages
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import TaskDetail from "./pages/TaskDetail";

export default function App() {
  return (
    <BrowserRouter>
      <TasksProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<TaskList />} />
            <Route path="/task/:id" element={<TaskDetail />} />
            <Route path="/manager" element={<AddTask />} />
          </Route>
        </Routes>
      </TasksProvider>
    </BrowserRouter>
  );
}
