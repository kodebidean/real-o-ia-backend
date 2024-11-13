const express = require('express');
const { getMyScore, updateScore, getLeaderboard } = require('../controllers/scoreController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para obtener la puntuación del usuario
router.get('/my-score', protect, getMyScore);

// Ruta para actualizar la puntuación del usuario
router.post('/update', protect, updateScore);

// Ruta para obtener la clasificación global
router.get('/leaderboard', getLeaderboard);

module.exports = router;
