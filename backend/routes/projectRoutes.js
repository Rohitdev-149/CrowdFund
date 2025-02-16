const express = require("express");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 🟢 GET: Fetch All Projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 🟢 POST: Create a New Project (Authenticated Users Only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description, category, image, target, daysLeft } = req.body;

    if (!name || !description || !category || !target || !daysLeft) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProject = new Project({
      name,
      description,
      category,
      image,
      target,
      daysLeft,
      creator: req.user.id, // Gets user ID from the token
    });

    await newProject.save();
    res.status(201).json({ message: "Project created successfully!", project: newProject });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
