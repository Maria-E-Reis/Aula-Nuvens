const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Configurações do Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexão com o MongoDB
const mongoURI = "mongodb+srv://dudareis:159357reis@cluster0.ifwnt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Definir o esquema e o modelo para o histórico
const historicoSchema = new mongoose.Schema({
  userId: String,
  action: String,
  timestamp: { type: Date, default: Date.now }
});

const Historico = mongoose.model('Historico', historicoSchema);

// Rota para registrar histórico
app.post('/api/historico', async (req, res) => {
  try {
    const { userId, action } = req.body;
    const novoHistorico = new Historico({ userId, action });
    await novoHistorico.save();
    res.status(201).send('Histórico registrado com sucesso');
  } catch (error) {
    res.status(500).send('Erro ao registrar histórico');
  }
});

// Rota principal
app.get('/', (req, res) => {
  res.send('<h1>Bem-vindo ao Chatbot</h1><p>Use o endpoint /api/historico para registrar ações.</p>');
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
app.use(express.static('public'));
