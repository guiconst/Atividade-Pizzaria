const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// CREATE - POST /api/clientes
router.post('/', clienteController.criar);

// READ - GET /api/clientes (todos)
router.get('/', clienteController.listarTodos);

// READ - GET /api/clientes/:id (um específico)
router.get('/:id', clienteController.buscarPorId);

// UPDATE - PUT /api/clientes/:id
router.put('/:id', clienteController.atualizar);

// DELETE - DELETE /api/clientes/:id
router.delete('/:id', clienteController.deletar);

module.exports = router;