const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null },
  createdAt: { type: Date, default: Date.now }
});

// Ensure folder names are unique per user per parent folder
folderSchema.index({ name: 1, owner: 1, parent: 1 }, { unique: true });

module.exports = mongoose.model('Folder', folderSchema);