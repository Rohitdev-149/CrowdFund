require("dotenv").config(); 
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan"); // 🟢 Import Morgan for logging
const connectDB = require("./config/db");
const Razorpay = require('razorpay');
const Project = require("./models/Project");


const app = express();
connectDB(); 

// 🟢 Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  exposedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // 🟢 Enable form data parsing
app.use(morgan("dev")); // 🟢 Log incoming requests

// 🟢 Serve Static Files
app.use('/uploads', cors(), express.static(path.join(__dirname, 'uploads')));

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

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create an order
app.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  // Validate the amount
  if (!amount || isNaN(amount)) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  const options = {
    amount: amount * 100, // Razorpay expects amount in paise
    currency: 'INR',
    receipt: 'order_receipt_1',
  };

  try {
    console.log('Creating Razorpay order with options:', options);
    const order = await razorpay.orders.create(options);
    console.log('Razorpay order created successfully:', order);
    res.json({ order });
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
});

app.post("/update-funds", async (req, res) => {
  try {
    const { projectId, amount } = req.body;
    console.log("Received update request for:", projectId, "Amount:", amount);

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const project = await Project.findByIdAndUpdate(
      projectId,
      { $inc: { raised: numericAmount } }, // Raised amount ko increase karo
      { new: true }
    );

    if (!project) {
      console.log("Project not found!");
      return res.status(404).json({ message: "Project not found" });
    }

    console.log("Updated Project:", project);
    res.json({ message: "Funds updated successfully", project });
  } catch (error) {
    console.error("Error updating funds:", error);
    res.status(500).json({ message: "Error updating funds", error });
  }
});


// 🟢 Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));

// 🟢 API Test Route
app.get("/test", (req, res) => {
  res.json({ message: "Server is running!" });
});

// 🟢 Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ 
    message: "Internal Server Error", 
    error: err.message 
  }); 
});

// 🟢 Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`👉 Test the server: http://localhost:${PORT}/test`);
});
