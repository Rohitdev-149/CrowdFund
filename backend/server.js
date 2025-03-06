require("dotenv").config(); 
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan"); // 🟢 Import Morgan for logging
const connectDB = require("./config/db");

const app = express();
connectDB(); 

// 🟢 Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // 🟢 Enable form data parsing
app.use(morgan("dev")); // 🟢 Log incoming requests

// 🟢 Serve Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🟢 Create Upload Directory if Not Exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 🟢 Configure Multer for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage: storage });

// 🟢 Image Upload Route
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const imageUrl = `/uploads/${req.file.filename}`; 
  res.status(200).json({ message: "Image uploaded successfully", imageUrl });
});

// 🟢 Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes")); 

// 🟢 API Test Route
app.get("/", (req, res) => res.send("API is running...")); 

// 🟢 Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message }); 
});

// 🟢 Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
