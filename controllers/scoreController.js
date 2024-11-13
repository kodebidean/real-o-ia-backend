
const Score = require('../models/Score');
const User = require('../models/User');

// Obtener la puntuación del usuario
exports.getMyScore = async (req, res) => {
  try {
    // Buscar la puntuación del usuario
    let score = await Score.findOne({ user: req.user.id });

    // Si no existe una puntuación, crear una nueva
    if (!score) {
      score = new Score({ user: req.user.id });
      await score.save();
    }

    res.json(score);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la puntuación' });
  }
};

// Actualizar la puntuación del usuario al finalizar una partida

exports.updateScore = async (req, res) => {
  const { points } = req.body;

  try {
    let score = await Score.findOne({ user: req.user.id });

    // Si no existe una puntuación, crear una nueva para el usuario
    if (!score) {
      score = new Score({ user: req.user.id });
    }

    // Obtener la fecha actual y la fecha del último intento
    const currentDate = new Date().toISOString().slice(0, 10); // Solo el año-mes-día
    const lastAttemptDate = score.lastAttemptDate.toISOString().slice(0, 10);

    // Restablecer intentos si es un nuevo día
    if (currentDate !== lastAttemptDate) {
      score.attemptsLeft = 5;
    }

    // Verificar si tiene intentos restantes
    if (score.attemptsLeft <= 0) {
      return res.status(403).json({ message: 'No tienes intentos restantes por hoy.' });
    }

    // Actualizar la mejor puntuación si el nuevo puntaje es mayor
    if (points > score.bestScore) {
      score.bestScore = points;
    }

    // Reducir el número de intentos y actualizar la fecha del último intento
    score.attemptsLeft -= 1;
    score.lastAttemptDate = new Date();
    await score.save();

    res.json(score);
  } catch (error) {
    res.status(500).js
  }
}

// Obtener la clasificación global de las mejores puntuaciones
exports.getLeaderboard = async (req, res) => {
  try {
    const topScores = await Score.find({}, 'user bestScore')
      .sort({ bestScore: -1 })   // Ordenar por bestScore de mayor a menor
      .limit(100)                 // Limitar a los 100 mejores
      .populate('user', 'username');  // Traer el campo username del modelo User

    res.json(topScores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la clasificación' });
  }
};

