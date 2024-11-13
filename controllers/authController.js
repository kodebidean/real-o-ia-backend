const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Registrar usuario
exports.register = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Verificar si el usuario ya existe
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'Usuario ya registrado' });
    }

    // Crear nuevo usuario
    user = new User({ username, password });
    await user.save();

    // Generar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Iniciar sesión
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    // Generar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
