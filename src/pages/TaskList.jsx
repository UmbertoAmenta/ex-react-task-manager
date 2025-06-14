import { useCallback, useContext, useMemo, useState } from "react";
import TasksContext from "../contexts/TasksContext";

// components
import TaskRow from "../components/TaskRow";

import debounce from "../utilities/debounce";

export default function TaskList() {
  const { tasks } = useContext(TasksContext);

  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);

  const handleSearch = useCallback(
    debounce((e) => {
      setSearchQuery(e.target.value);
    }, 400),
    [searchQuery]
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  const sortedTasks = useMemo(() => {
    const statusOrder = { "To do": 0, Doing: 1, Done: 2 };

    return [...filteredTasks].sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title) * sortOrder;
      }

      if (sortBy === "status") {
        return (statusOrder[a.status] - statusOrder[b.status]) * sortOrder;
      }

      if (sortBy === "createdAt") {
        return (
          (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
          sortOrder
        );
      }
      return 0;
    });
  }, [filteredTasks, sortBy, sortOrder]);

  return (
    <main className="container">
      <section className="search-bar">
        <input
          type="text"
          // value={searchQuery}
          onChange={handleSearch}
          placeholder="Digita e cerca"
        />
      </section>
      <div>
        <div className="grid head">
          <button
            onClick={() => {
              if (sortBy === "title") {
                setSortOrder(sortOrder * -1);
              } else {
                setSortBy("title");
                setSortOrder(1);
              }
            }}
          >
            Attività
            {sortBy === "title" ? (sortOrder === 1 ? "⬆️" : "⬇️") : null}
          </button>
          <button
            onClick={() => {
              if (sortBy === "status") {
                setSortOrder(sortOrder * -1);
              } else {
                setSortBy("status");
                setSortOrder(1);
              }
            }}
          >
            Status
            {sortBy === "status" ? (sortOrder === 1 ? "⬆️" : "⬇️") : null}
          </button>
          <button
            onClick={() => {
              if (sortBy === "createdAt") {
                setSortOrder(sortOrder * -1);
              } else {
                setSortBy("createdAt");
                setSortOrder(1);
              }
            }}
          >
            Data di creazione
            {sortBy === "createdAt" ? (sortOrder === 1 ? "⬆️" : "⬇️") : null}
          </button>
        </div>
        {sortedTasks.map((t) => (
          <TaskRow key={t.id} task={t} />
        ))}
      </div>
    </main>
  );
}
