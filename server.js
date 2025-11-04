// backend/server.js

// 🛑 1. Carregar Variáveis de Ambiente PRIMEIRO
require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const mongoSanitizer = require('./middleware/mongoSanitizer');
const cors = require('cors'); // Removido para usar apenas no Middleware

// 2. Variáveis de Ambiente
const MONGODB_URI = process.env.MONGODB_URI; 
// Mantemos 8080 como o padrão do Cloud Run para escuta do Express
const PORT = process.env.PORT || 8080; 


// 3. Checagem de Segurança
if (!MONGODB_URI) {
    console.error("FATAL ERROR: MONGODB_URI não está definida.");
    process.exit(1);
}


// 4. Inicializar o Express
const app = express();

// 5. Middlewares de Segurança e Conexão
app.use(helmet()); 
app.use(express.json()); 
app.use(mongoSanitizer); 

app.use(cors({
    origin: '*', 
}));

// --- Funções de Inicialização ---

// Função para iniciar a conexão com o MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Conexão com MongoDB bem-sucedida!');
    } catch (err) {
        console.error('Erro na conexão com MongoDB. Detalhes:', err.message);
        // Não encerramos o processo aqui, apenas logamos o erro
    }
};

// Função para iniciar o servidor
const startServer = () => {
    // 🛑 CRÍTICO: Servidor Express escuta a porta antes de se preocupar com o DB
    app.listen(PORT, () => { 
        console.log(`Servidor Express rodando na porta ${PORT}`);
        // Chama a conexão com o DB APÓS o servidor estar escutando
        connectDB(); 
    });
};


// 6. Rotas (devem ser definidas antes de iniciar o servidor)
const agendamentoRoutes = require('./routes/agendamentoRoutes');
app.use('/api/agendamentos', agendamentoRoutes);

app.get('/', (req, res) => {
    res.send('Servidor backend da Clínica rodando!');
});


// 7. INÍCIO DA APLICAÇÃO
startServer();