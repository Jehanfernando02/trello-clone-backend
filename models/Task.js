const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['To-do', 'In Progress', 'Done'], default: 'To-do' },
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
  position: { type: Number, default: 0 }, // For drag & drop ordering
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);