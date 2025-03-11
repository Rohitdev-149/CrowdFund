const express = require("express");
const multer = require("multer");
const path = require("path");
const Project = require("../models/Project");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Store in 'uploads/' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

// 🟢 Create a New Project
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { name, description, category, target, daysLeft } = req.body;

    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newProject = new Project({
      name,
      description,
      category,
      target,
      daysLeft,
      image: imageUrl,
      user: req.user.id // Associate project with user
    });

    await newProject.save();

    // Add project to user's campaigns
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { campaigns: newProject._id } }
    );

    res.status(201).json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Failed to create project", error: error.message });
  }
});

// 🟢 Get All Projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// 🟢 Get Project by ID (For Project Details Page)
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// 🟢 Get Related Projects by Category
router.get("/category/:category", async (req, res) => {
  try {
    const projects = await Project.find({
      category: req.params.category,
    }).limit(4);
    res.json(projects);
  } catch (error) {
    console.error("Error fetching related projects:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
