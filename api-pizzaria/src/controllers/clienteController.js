const database = require('../data/database');

const clienteController = {
  // CREATE - Cadastrar novo cliente
  criar: (req, res) => {
    const { nome, telefone, endereco, email } = req.body;
    
    if (!nome || !telefone) {
      return res.status(400).json({ erro: 'Nome e telefone são obrigatórios' });
    }
    
    const novoCliente = {
      id: database.nextClienteId++,
      nome,
      telefone,
      endereco: endereco || '',
      email: email || ''
    };
    
    database.clientes.push(novoCliente);
    res.status(201).json(novoCliente);
  },
  
  // READ - Listar todos os clientes
  listarTodos: (req, res) => {
    res.json(database.clientes);
  },
  
  // READ - Buscar cliente por ID
  buscarPorId: (req, res) => {
    const { id } = req.params;
    const cliente = database.clientes.find(c => c.id === parseInt(id));
    
    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    
    res.json(cliente);
  },
  
  // UPDATE - Atualizar dados do cliente
  atualizar: (req, res) => {
    const { id } = req.params;
    const { nome, telefone, endereco, email } = req.body;
    
    const index = database.clientes.findIndex(c => c.id === parseInt(id));
    
    if (index === -1) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    
    database.clientes[index] = {
      ...database.clientes[index],
      nome: nome || database.clientes[index].nome,
      telefone: telefone || database.clientes[index].telefone,
      endereco: endereco || database.clientes[index].endereco,
      email: email || database.clientes[index].email
    };
    
    res.json(database.clientes[index]);
  },
  
  // DELETE - Remover cliente
  deletar: (req, res) => {
    const { id } = req.params;
    const index = database.clientes.findIndex(c => c.id === parseInt(id));
    
    if (index === -1) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    
    const clienteRemovido = database.clientes.splice(index, 1);
    res.json({ 
      mensagem: 'Cliente removido com sucesso',
      cliente: clienteRemovido[0]
    });
  }
};

module.exports = clienteController;