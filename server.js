// backend/server.js

// 🛑 1. Carregar Variáveis de Ambiente PRIMEIRO
require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitizer = require('./middleware/mongoSanitizer'); 


// 2. Variáveis de Ambiente
const MONGODB_URI = process.env.MONGODB_URI; 
// CRÍTICO: Usa a porta do ambiente (8080 no Cloud Run) ou 5000 localmente.
const PORT = process.env.PORT || 5000; 


// 3. Checagem de Segurança antes de conectar
if (!MONGODB_URI) {
    console.error("FATAL ERROR: MONGODB_URI não está definida.");
    process.exit(1);
}


// 4. Inicializar o Express
const app = express();

// 5. Middlewares de Segurança e Conexão
app.use(helmet()); 
app.use(express.json()); 
app.use(mongoSanitizer); // Usando o sanitizador customizado

app.use(cors({
    origin: '*', 
}));


// 6. Conexão com o MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Conexão com MongoDB bem-sucedida!'))
    .catch(err => {
        console.error('Erro na conexão com MongoDB. Detalhes:', err.message);
    });


// 7. Importar e Usar Rotas
const agendamentoRoutes = require('./routes/agendamentoRoutes');
app.use('/api/agendamentos', agendamentoRoutes);


// Rota de Teste Simples
app.get('/', (req, res) => {
    res.send('Servidor backend da Clínica rodando!');
});


// 8. Iniciar o Servidor
// CRÍTICO: app.listen usa a variável PORT, que será 8080 no Cloud Run
app.listen(PORT, () => { 
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acessível em http://localhost:${PORT}`);
});