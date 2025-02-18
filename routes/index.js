const express = require('express');
const router = express.Router();

// Importar rutas individuales
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');

// Usar las rutas importadas
router.use('/auth', authRoutes);
router.use('/products', productRoutes);

// Aquí podrías añadir más rutas si tienes otros archivos de rutas

module.exports = router;