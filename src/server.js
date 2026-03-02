// src/server.js
require('dotenv').config(); // 1) Carga .env antes de cualquier import que use process.env

const app = require('./app');     // 2) Tu instancia de Express (debe exportar app)
const db = require('./models');   // 3) Carga Sequelize + modelos (usa process.env)

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    // 4) Probar conexion
    await db.sequelize.authenticate();
    console.log('✅ DB conectada');

    // 5) Levantar servidor HTTP
    app.listen(PORT, () => {
      console.log(`✅ API corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al iniciar:', err);
    process.exit(1);
  }
}

start();