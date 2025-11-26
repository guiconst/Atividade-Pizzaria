const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// CREATE - POST /api/pedidos
router.post('/', pedidoController.criar);

// READ - GET /api/pedidos (todos)
router.get('/', pedidoController.listarTodos);

// READ - GET /api/pedidos/:id (um específico)
router.get('/:id', pedidoController.buscarPorId);

// UPDATE - PATCH /api/pedidos/:id/status
router.patch('/:id/status', pedidoController.atualizarStatus);

// DELETE - DELETE /api/pedidos/:id
router.delete('/:id', pedidoController.deletar);

module.exports = router;