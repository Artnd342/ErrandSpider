import React, { useEffect, useState } from "react";

export default function TestFetch() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/errands")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <h1>Tasks from backend</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
