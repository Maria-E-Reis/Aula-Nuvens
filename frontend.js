// Função para fazer login
function fazerLogin(userId) {
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    })
    .then(response => response.json())
    .then(data => console.log('Login registrado:', data))
    .catch(error => console.error('Erro ao registrar login:', error));
  }
  
  // Função para salvar a conversa
  function salvarConversa(userId, message) {
    fetch('http://localhost:3000/api/conversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, message })
    })
    .then(response => response.json())
    .then(data => console.log('Mensagem salva:', data))
    .catch(error => console.error('Erro ao salvar mensagem:', error));
  }
  
  // Função para carregar histórico de conversas
  function carregarHistorico(userId) {
    fetch(`http://localhost:3000/api/conversations/${userId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Histórico de conversas:', data);
        // Exibir ou processar o histórico, por exemplo:
        data.forEach(conversa => console.log(`${conversa.timestamp}: ${conversa.message}`));
      })
      .catch(error => console.error('Erro ao carregar histórico:', error));
  }
  
  // Exemplo de como usar:
  const userId = 'usuario123';
  fazerLogin(userId);  // Registra o login
  salvarConversa(userId, "Olá, chatbot!");  // Envia uma mensagem
  carregarHistorico(userId);  // Carrega o histórico de conversas
  