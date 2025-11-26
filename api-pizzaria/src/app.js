const express = require('express');
const cors = require('cors');
const pizzaRoutes = require('./routes/pizzaRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rota inicial da API
app.get('/api', (req, res) => {
  res.json({ 
    mensagem: 'Bem-vindo à API da Pizzaria! 🍕',
    endpoints: {
      pizzas: '/api/pizzas',
      clientes: '/api/clientes',
      pedidos: '/api/pedidos'
    }
  });
});

// Rotas
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/pedidos', pedidoRoutes);

// Middleware de erro 404
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

module.exports = app;