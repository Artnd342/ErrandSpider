// SuggestedTasks.js
import React from 'react';

function SuggestedTasks({ tasks }) {
  return (
    <div style={{ marginTop: '30px' }}>
      <h3>AI Suggested Task Order (by Estimated Time)</h3>
      <ol>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.estimated_time} min
          </li>
        ))}
      </ol>
    </div>
  );
}

export default SuggestedTasks;









