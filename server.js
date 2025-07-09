const express = require('express');
const cors = require('cors');

const aiRoutes = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 5000;

// Use express.json() instead of body-parser
app.use(cors());
app.use(express.json());

app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


