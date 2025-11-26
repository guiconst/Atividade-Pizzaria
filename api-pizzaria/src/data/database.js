const database = {
  pizzas: [
    {
      id: 1,
      nome: 'Margherita',
      ingredientes: ['Molho de tomate', 'Mussarela', 'Manjericão'],
      tamanhos: {
        pequena: 25.00,
        media: 35.00,
        grande: 45.00
      }
    },
    {
      id: 2,
      nome: 'Calabresa',
      ingredientes: ['Molho de tomate', 'Mussarela', 'Calabresa', 'Cebola'],
      tamanhos: {
        pequena: 28.00,
        media: 38.00,
        grande: 48.00
      }
    },
    {
      id: 3,
      nome: 'Portuguesa',
      ingredientes: ['Molho de tomate', 'Mussarela', 'Presunto', 'Ovos', 'Cebola', 'Azeitonas'],
      tamanhos: {
        pequena: 30.00,
        media: 40.00,
        grande: 50.00
      }
    }
  ],
  
  clientes: [
    {
      id: 1,
      nome: 'João Silva',
      telefone: '(11) 98765-4321',
      endereco: 'Rua das Flores, 123',
      email: 'joao@email.com'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      telefone: '(11) 91234-5678',
      endereco: 'Av. Principal, 456',
      email: 'maria@email.com'
    }
  ],
  
  pedidos: [
    {
      id: 1,
      clienteId: 1,
      itens: [
        { pizzaId: 1, tamanho: 'grande', quantidade: 1 }
      ],
      total: 45.00,
      status: 'em preparo',
      dataPedido: new Date().toISOString()
    }
  ],
  
  // Contadores para IDs auto-incrementais
  nextPizzaId: 4,
  nextClienteId: 3,
  nextPedidoId: 2
};

module.exports = database;