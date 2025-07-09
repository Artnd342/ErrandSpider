// index.js
const express = require('express');
const cors = require('cors');
const errandsRouter = require('./routes/errands');
const aiRouter = require('./routes/ai');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/errands', errandsRouter);
app.use('/api/ai', aiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



