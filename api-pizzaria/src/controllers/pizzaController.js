const database = require('../data/database');

const pizzaController = {
  // CREATE - Adicionar nova pizza ao cardápio
  criar: (req, res) => {
    const { nome, ingredientes, tamanhos } = req.body;
    
    if (!nome || !ingredientes || !tamanhos) {
      return res.status(400).json({ erro: 'Nome, ingredientes e tamanhos são obrigatórios' });
    }
    
    const novaPizza = {
      id: database.nextPizzaId++,
      nome,
      ingredientes,
      tamanhos
    };
    
    database.pizzas.push(novaPizza);
    res.status(201).json(novaPizza);
  },
  
  // READ - Listar todas as pizzas
  listarTodas: (req, res) => {
    res.json(database.pizzas);
  },
  
  // READ - Buscar pizza por ID
  buscarPorId: (req, res) => {
    const { id } = req.params;
    const pizza = database.pizzas.find(p => p.id === parseInt(id));
    
    if (!pizza) {
      return res.status(404).json({ erro: 'Pizza não encontrada' });
    }
    
    res.json(pizza);
  },
  
  // UPDATE - Atualizar pizza existente
  atualizar: (req, res) => {
    const { id } = req.params;
    const { nome, ingredientes, tamanhos } = req.body;
    
    const index = database.pizzas.findIndex(p => p.id === parseInt(id));
    
    if (index === -1) {
      return res.status(404).json({ erro: 'Pizza não encontrada' });
    }
    
    database.pizzas[index] = {
      ...database.pizzas[index],
      nome: nome || database.pizzas[index].nome,
      ingredientes: ingredientes || database.pizzas[index].ingredientes,
      tamanhos: tamanhos || database.pizzas[index].tamanhos
    };
    
    res.json(database.pizzas[index]);
  },
  
  // DELETE - Remover pizza do cardápio
  deletar: (req, res) => {
    const { id } = req.params;
    const index = database.pizzas.findIndex(p => p.id === parseInt(id));
    
    if (index === -1) {
      return res.status(404).json({ erro: 'Pizza não encontrada' });
    }
    
    const pizzaRemovida = database.pizzas.splice(index, 1);
    res.json({ 
      mensagem: 'Pizza removida com sucesso',
      pizza: pizzaRemovida[0]
    });
  }
};

module.exports = pizzaController;