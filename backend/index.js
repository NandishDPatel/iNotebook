const express = require('express');
const cors = require('cors');

require('dotenv').config();  // Load environment variables from .env
const connectToMongo = require('./db');


connectToMongo();
const app = express();
const port = process.env.PORT || 5000;  // Use environment variable if available

// Middleware 
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Test Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start Server
app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`);
});
