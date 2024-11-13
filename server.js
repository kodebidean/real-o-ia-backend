const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Definir rutas (aquí puedes añadir tus rutas de puntuaciones, autenticación, etc.)
// app.use('/api/scores', require('./routes/scoreRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
