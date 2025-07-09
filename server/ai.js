// server/ai.js
const pool = require('./db'); // your PostgreSQL pool connection

async function suggestTasks() {
  try {
    // Fetch all tasks from the 'work' table (or wherever tasks are stored)
    const result = await pool.query('SELECT * FROM work ORDER BY estimated_time ASC');

    const tasks = result.rows;

    if (tasks.length === 0) {
      // If no tasks found, return empty array or some default suggestions
      return [];
    }

    // Example: Just return tasks sorted by estimated_time as suggestions
    // You can add AI logic here later
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks for AI suggestions:', error);
    throw error; // propagate error for route handler
  }
}

module.exports = { suggestTasks };

