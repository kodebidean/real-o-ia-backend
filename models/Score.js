const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bestScore: { type: Number, default: 0 },
  attemptsLeft: { type: Number, default: 5 },
  lastAttemptDate: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Score', scoreSchema);
