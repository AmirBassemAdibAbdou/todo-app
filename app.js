const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // <-- Add this line
const todosRouter = require('./routes/todos');
const { notFoundHandler, generalErrorHandler } = require('./middleware/errorHandlers');

const app = express();
app.use(cors()); // <-- Add this line
app.use(express.json());
app.use('/api/todos', todosRouter);
app.use(notFoundHandler);
app.use(generalErrorHandler);

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/todosdb'; // Change 'todosdb' to your preferred DB name

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  // Start server after successful DB connection
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

