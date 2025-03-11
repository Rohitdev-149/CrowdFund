const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  raised: { type: Number, default: 0 },
  target: { type: Number, required: true },
  category: { type: String, required: true },
  investors: { type: Number, default: 0 },
  daysLeft: { type: Number, required: true },
  image: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active',
    lowercase: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
