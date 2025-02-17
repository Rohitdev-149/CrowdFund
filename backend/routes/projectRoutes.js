const express = require("express");
const multer = require("multer");
const path = require("path");
const Project = require("../models/Project");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res) => {
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
    });

    await newProject.save();
    res.status(201).json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Failed to create project", error: error.message });
  }
});

router.get("", async (req, res) => {
  try {
    const projects = await Project.find();  // Fetch all projects from MongoDB
    res.json(projects);  // Return the projects as JSON
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

module.exports = router;
