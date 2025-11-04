import React, { memo } from "react";
import { useTasks } from "../context/TaskContext.jsx";

function TaskItem({ task }) {
  const { toggleTask, deleteTask } = useTasks();

  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      <span className={task.completed ? "completed" : ""}>{task.text}</span>
      <button onClick={() => deleteTask(task.id)}>❌</button>
    </li>
  );
}

export default memo(TaskItem);
