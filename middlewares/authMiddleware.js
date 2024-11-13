const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Obtener el token de los encabezados

  if (!token) {
    return res.status(401).json({ message: "No autorizado, falta el token" });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Adjuntar el usuario decodificado a la solicitud
    next();
  } catch (error) {
    res.status(401).json({ message: "Token no válido" });
  }
};

module.exports = protect;
