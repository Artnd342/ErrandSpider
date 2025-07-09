import React, { useState, useEffect } from "react";

function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }
    onAdd({
      title: title.trim(),
      estimated_time: estimatedTime ? Number(estimatedTime) : 0,
      completed,
    });
    setTitle("");
    setEstimatedTime("");
    setCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ marginRight: 10 }}
      />
      <input
        type="number"
        placeholder="Estimated time (mins)"
        value={estimatedTime}
        onChange={(e) => setEstimatedTime(e.target.value)}
        style={{ marginRight: 10, width: 150 }}
      />
      <label style={{ marginRight: 10 }}>
        Completed:
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          style={{ marginLeft: 5 }}
        />
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
}

function TaskList({ tasks, onDelete, onToggleComplete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editEstimatedTime, setEditEstimatedTime] = useState("");

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditEstimatedTime(task.estimated_time);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditEstimatedTime("");
  };

  const saveEdit = () => {
    if (!editTitle.trim()) {
      alert("Title cannot be empty");
      return;
    }
    onEdit(editingId, {
      title: editTitle.trim(),
      estimated_time: Number(editEstimatedTime) || 0,
    });
    cancelEditing();
  };

  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {tasks.map(({ id, title, estimated_time, completed }) => (
        <li
          key={id}
          style={{
            marginBottom: 10,
            padding: 10,
            border: "1px solid #ccc",
            borderRadius: 4,
            backgroundColor: completed ? "#d4edda" : "#f8d7da",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {editingId === id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{ marginRight: 10 }}
              />
              <input
                type="number"
                value={editEstimatedTime}
                onChange={(e) => setEditEstimatedTime(e.target.value)}
                style={{ marginRight: 10, width: 100 }}
              />
              <button onClick={saveEdit} style={{ marginRight: 5 }}>
                Save
              </button>
              <button onClick={cancelEditing}>Cancel</button>
            </>
          ) : (
            <>
              <div>
                <strong>{title}</strong> — {estimated_time} mins —{" "}
                {completed ? "Completed" : "Pending"}
              </div>
              <div>
                <button onClick={() => onToggleComplete(id, !completed)}>
                  {completed ? "Mark Pending" : "Mark Completed"}
                </button>
                <button
                  onClick={() =>
                    editingId === id ? cancelEditing() : startEditing({ id, title, estimated_time })
                  }
                  style={{ marginLeft: 5 }}
                >
                  Edit
                </button>
                <button onClick={() => onDelete(id)} style={{ marginLeft: 5 }}>
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

function SuggestedTasks({ suggestions }) {
  if (!suggestions.length) return <p>No AI suggestions yet.</p>;
  return (
    <div>
      <h2>AI Suggested Task Order</h2>
      <ol>
        {suggestions.map(({ id, title, estimated_time }) => (
          <li key={id}>
            {title} — {estimated_time} mins
          </li>
        ))}
      </ol>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/errands");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  async function addTask(task) {
    try {
      const res = await fetch("http://localhost:5000/api/errands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error("Failed to add task");
      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      alert(err.message);
    }
  }

  async function deleteTask(id) {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/errands/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  async function toggleComplete(id, completed) {
    try {
      const res = await fetch(`http://localhost:5000/api/errands/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
      if (!res.ok) throw new Error("Failed to update completion");
      const updatedTask = await res.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      alert(err.message);
    }
  }

  async function editTask(id, updatedFields) {
    try {
      const res = await fetch(`http://localhost:5000/api/errands/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      if (!res.ok) throw new Error("Failed to edit task");
      const updatedTask = await res.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      alert(err.message);
    }
  }

  async function fetchAISuggestions() {
    try {
      if (tasks.length === 0) {
        alert("Add some tasks first to get AI suggestions");
        return;
      }
      const res = await fetch("http://localhost:5000/api/ai/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks }),
      });
      if (!res.ok) throw new Error("Failed to get AI suggestions");
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div style={{ maxWidth: 700, margin: "20px auto", padding: 20 }}>
      <h1>ErrandSpider Task Manager</h1>

      <AddTask onAdd={addTask} />

      <button onClick={fetchAISuggestions} style={{ marginBottom: 20 }}>
        Get AI Suggested Task Order
      </button>

      <SuggestedTasks suggestions={suggestions} />

      <hr />

      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onToggleComplete={toggleComplete}
        onEdit={editTask}
      />
    </div>
  );
}

export default App;










