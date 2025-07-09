import React from "react";

function TaskList({ tasks, onToggleComplete, onDelete, onEdit }) {
  return (
    <div className="p-4 space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center bg-white shadow-md p-4 rounded-xl"
        >
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id, task.completed)}
            />
            <div>
              <p className={`text-lg ${task.completed ? "line-through" : ""}`}>
                {task.title}
              </p>
              <p className="text-sm text-gray-500">
                Estimated time: {task.estimated_time} min
              </p>
            </div>
          </div>
          <div className="space-x-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => onEdit(task)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
