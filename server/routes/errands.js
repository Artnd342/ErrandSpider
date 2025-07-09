// routes/errands.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM work ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('GET /api/errands error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new task
router.post('/', async (req, res) => {
  try {
    const { title, estimated_time, completed } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Task title is required' });
    }
    const result = await pool.query(
      'INSERT INTO work (title, estimated_time, completed) VALUES ($1, $2, $3) RETURNING *',
      [title, estimated_time || 0, completed || false]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST /api/errands error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a task (edit or toggle complete)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, estimated_time, completed } = req.body;

    // You can update any or all fields
    const result = await pool.query(
      `UPDATE work SET 
        title = COALESCE($1, title), 
        estimated_time = COALESCE($2, estimated_time), 
        completed = COALESCE($3, completed) 
      WHERE id = $4 RETURNING *`,
      [title, estimated_time, completed, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('PUT /api/errands/:id error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});
// PATCH /api/errands/:id — Update completed status
router.patch("/:id", async (req, res) => {
  console.log('PATCH /api/errands/:id called with id:', req.params.id);
  const { id } = req.params;
  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    return res.status(400).json({ message: "Completed must be boolean" });
  }

  try {
    const result = await pool.query(
      "UPDATE work SET completed = $1 WHERE id = $2 RETURNING *",
      [completed, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});


// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM work WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('DELETE /api/errands/:id error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

















