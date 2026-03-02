// src/app.js

const express = require('express');
const cors = require('cors');

const app = express();

// 🔹 Middlewares globales
app.use(cors());                // Permite peticiones externas (frontend)
app.use(express.json());        // Permite recibir JSON en body
app.use(express.urlencoded({ extended: true }));

// 🔹 Ruta base de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API P-REC funcionando 🚀' });
});

// 🔹 Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 🔹 Aquí irán tus rutas reales
// app.use('/personas', require('./routes/persona.routes'));
// app.use('/aportes', require('./routes/aporte.routes'));
// app.use('/recaudaciones', require('./routes/recaudacion.routes'));

module.exports = app;