import React, { useState, useMemo } from "react";
import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";


function TaskList() {
  const { tasks, setTasks } = useTasks(); // we’ll slightly modify context soon
  const [filter, setFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    if (filter === "completed") return tasks.filter((t) => t.completed);
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);

  // Handles reordering logic
  const handleDragEnd = (result) => {
    if (!result.destination) return; // dropped outside
    const newTasks = Array.from(tasks);
    const [moved] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, moved);
    setTasks(newTasks);
  };

  return (
    <div className="task-list">
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredTasks.length === 0 ? (
                <p>No tasks found.</p>
              ) : (
                filteredTasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="task-item"
                      >
                        <TaskItem task={task} />
                      </li>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TaskList;
