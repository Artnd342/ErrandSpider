// routes/ai.js
const express = require('express');
const router = express.Router();

const { suggestTasks } = require('../server/ai');

router.post('/suggest', async (req, res) => {
  try {
    const tasks = await suggestTasks();

    if (tasks.length === 0) {
      return res.status(200).json({ message: 'No suggestions available', tasks: [] });
    }

    res.json({ tasks });
  } catch (error) {
    console.error('Error in /api/ai/suggest:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

