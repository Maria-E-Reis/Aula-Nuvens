const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');


// Configurações do Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Conexão com o MongoDB
const mongoURI = "mongodb+srv://dudareis:159357reis@cluster0.ifwnt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Definir o esquema e o modelo para o histórico

const conversationSchema = new mongoose.Schema({
  userId: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const loginSchema = new mongoose.Schema({
  userId: String,
  loginTime: { type: Date, default: Date.now }
});

const Conversation = mongoose.model('Conversation', conversationSchema);
const Login = mongoose.model('Login', loginSchema);


// Rota para registrar conversa
app.post('/api/conversation', async (req, res) => {
  try {
    const { userId, message } = req.body;
    const novaConversa = new Historico({ userId, action });
    await novaCoversa.save();
    res.status(201).send('Conversa salva com sucesso');
  } catch (error) {
    res.status(500).send('Erro ao salvar conversa');
  }
});

// Rota para armazenar um login
app.post('/api/login', async (req, res) => {
  try {
      const { userId } = req.body;
      const NovoLogin = new Login({ userId });
      await NovoLogin.save();
      res.status(201).send('Login registrado com sucesso');
  } catch (error) {
      res.status(500).send('Erro ao registrar login');
  }
});

// Rota principal
app.get('/', (req, res) => {
  res.send('Servidor está funcionando');
});

function saveConversation(userId, message) {
  fetch('/api/conversation', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, message })
  })
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
}

function saveLogin(userId) {
  fetch('/api/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
  })
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
}

// Iniciar o servidor
app.listen(3000, () => console.log(`Servidor rodando na porta 3000`));
app.use(express.static('public'));
