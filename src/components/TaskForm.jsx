import { useState } from "react";
import { useTasks } from "../context/TaskContext.jsx";

function TaskForm() {
  const [text, setText] = useState("");
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return alert("Task cannot be empty!");
    addTask(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task..."
      />
      <button type="submit">Add</button>
    </form>
  );
}
export default TaskForm;
