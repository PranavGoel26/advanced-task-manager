import { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const addTask = useCallback(
    (text) => {
      if (!text.trim()) return;
      setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    },
    [tasks, setTasks]
  );

  const toggleTask = useCallback(
    (id) => {
      setTasks(
        tasks.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );
    },
    [tasks, setTasks]
  );

  const deleteTask = useCallback(
    (id) => {
      setTasks(tasks.filter((t) => t.id !== id));
    },
    [tasks, setTasks]
  );

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, addTask, toggleTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
