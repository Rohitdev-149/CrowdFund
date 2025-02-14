require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Add CORS support

const app = express();
connectDB();

app.use(cors()); // Enable CORS
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => res.send('API is running...'));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
