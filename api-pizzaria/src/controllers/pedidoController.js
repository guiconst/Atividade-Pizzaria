const database = require('../data/database');

const pedidoController = {
  // CREATE - Criar novo pedido
  criar: (req, res) => {
    const { clienteId, itens } = req.body;
    
    if (!clienteId || !itens || itens.length === 0) {
      return res.status(400).json({ erro: 'ClienteId e itens são obrigatórios' });
    }
    
    // Verificar se o cliente existe
    const cliente = database.clientes.find(c => c.id === clienteId);
    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    
    // Calcular o total do pedido
    let total = 0;
    for (const item of itens) {
      const pizza = database.pizzas.find(p => p.id === item.pizzaId);
      if (!pizza) {
        return res.status(404).json({ erro: `Pizza com ID ${item.pizzaId} não encontrada` });
      }
      if (!pizza.tamanhos[item.tamanho]) {
        return res.status(400).json({ erro: `Tamanho ${item.tamanho} não disponível para a pizza ${pizza.nome}` });
      }
      total += pizza.tamanhos[item.tamanho] * item.quantidade;
    }
    
    const novoPedido = {
      id: database.nextPedidoId++,
      clienteId,
      itens,
      total: parseFloat(total.toFixed(2)),
      status: 'pendente',
      dataPedido: new Date().toISOString()
    };
    
    database.pedidos.push(novoPedido);
    res.status(201).json(novoPedido);
  },
  
  // READ - Listar todos os pedidos
  listarTodos: (req, res) => {
    // Enriquecer os dados com informações de clientes e pizzas
    const pedidosCompletos = database.pedidos.map(pedido => {
      const cliente = database.clientes.find(c => c.id === pedido.clienteId);
      const itensDetalhados = pedido.itens.map(item => {
        const pizza = database.pizzas.find(p => p.id === item.pizzaId);
        return {
          ...item,
          nomePizza: pizza ? pizza.nome : 'Pizza não encontrada',
          preco: pizza ? pizza.tamanhos[item.tamanho] : 0
        };
      });
      
      return {
        ...pedido,
        nomeCliente: cliente ? cliente.nome : 'Cliente não encontrado',
        itens: itensDetalhados
      };
    });
    
    res.json(pedidosCompletos);
  },
  
  // READ - Buscar pedido por ID
  buscarPorId: (req, res) => {
    const { id } = req.params;
    const pedido = database.pedidos.find(p => p.id === parseInt(id));
    
    if (!pedido) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }
    
    // Enriquecer com dados do cliente e pizzas
    const cliente = database.clientes.find(c => c.id === pedido.clienteId);
    const itensDetalhados = pedido.itens.map(item => {
      const pizza = database.pizzas.find(p => p.id === item.pizzaId);
      return {
        ...item,
        nomePizza: pizza ? pizza.nome : 'Pizza não encontrada',
        preco: pizza ? pizza.tamanhos[item.tamanho] : 0
      };
    });
    
    res.json({
      ...pedido,
      cliente: cliente || 'Cliente não encontrado',
      itens: itensDetalhados
    });
  },
  
  // UPDATE - Atualizar status do pedido
  atualizarStatus: (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const statusValidos = ['pendente', 'em preparo', 'saiu para entrega', 'entregue', 'cancelado'];
    
    if (!status || !statusValidos.includes(status)) {
      return res.status(400).json({ 
        erro: 'Status inválido',
        statusValidos 
      });
    }
    
    const index = database.pedidos.findIndex(p => p.id === parseInt(id));
    
    if (index === -1) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }
    
    database.pedidos[index].status = status;
    res.json(database.pedidos[index]);
  },
  
  // DELETE - Cancelar/remover pedido
  deletar: (req, res) => {
    const { id } = req.params;
    const index = database.pedidos.findIndex(p => p.id === parseInt(id));
    
    if (index === -1) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }
    
    const pedidoRemovido = database.pedidos.splice(index, 1);
    res.json({ 
      mensagem: 'Pedido removido com sucesso',
      pedido: pedidoRemovido[0]
    });
  }
};

module.exports = pedidoController;