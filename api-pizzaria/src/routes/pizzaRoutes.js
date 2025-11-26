const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizzaController');

// CREATE - POST /api/pizzas
router.post('/', pizzaController.criar);

// READ - GET /api/pizzas (todas)
router.get('/', pizzaController.listarTodas);

// READ - GET /api/pizzas/:id (uma específica)
router.get('/:id', pizzaController.buscarPorId);

// UPDATE - PUT /api/pizzas/:id
router.put('/:id', pizzaController.atualizar);

// DELETE - DELETE /api/pizzas/:id
router.delete('/:id', pizzaController.deletar);

module.exports = router;