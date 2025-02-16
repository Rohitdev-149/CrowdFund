const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, default: "https://via.placeholder.com/150" },
  target: { type: Number, required: true },
  raised: { type: Number, default: 0 },
  investors: { type: Number, default: 0 },
  daysLeft: { type: Number, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Linked to user
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);
