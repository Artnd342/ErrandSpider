import React, { useState } from "react";

function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    // Prepare data to send
    const newTask = {
      title: title.trim(),
      estimated_time: estimatedTime ? parseInt(estimatedTime, 10) : 0,
      completed: false,
    };

    try {
      const response = await fetch("http://localhost:5000/api/errands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const addedTask = await response.json();

      // Call parent callback to add task to UI
      onAdd(addedTask);

      // Clear inputs
      setTitle("");
      setEstimatedTime("");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Error adding task. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Estimated time (minutes)"
        value={estimatedTime}
        onChange={(e) => setEstimatedTime(e.target.value)}
        min="0"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTask;











