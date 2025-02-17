const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  raised: Number,
  target: Number,
  category: String,
  investors: Number,
  daysLeft: Number,
  image: String,  
});

module.exports = mongoose.model('Project', projectSchema);
