const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes'); // Suponiendo que tienes un archivo que agrupa todas tus rutas

const app = express();

// Middleware para CORS
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', routes);

// Si estás sirviendo archivos estáticos, por ejemplo, en producción
// app.use(express.static(path.join(__dirname, 'client', 'build')));

module.exports = app;