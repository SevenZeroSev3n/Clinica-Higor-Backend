// backend/server.js

// 🛑 1. Carregar Variáveis de Ambiente PRIMEIRO
require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const mongoSanitizer = require('./middleware/mongoSanitizer');
const cors = require('cors');

// 2. Variáveis de Ambiente
const MONGODB_URI = process.env.MONGODB_URI; 
const PORT = process.env.PORT || 8080; 

if (!MONGODB_URI) {
    console.error("FATAL ERROR: MONGODB_URI não está definida.");
    process.exit(1);
}

// 3. Inicializar o Express
const app = express();

// 4. Middlewares de Segurança e CORS
app.use(helmet()); 

// CRÍTICO: Definindo a lista de origens PERMITIDAS.
const allowedOrigins = [
    // 🛑 Adicione aqui a URL COMPLETA do seu serviço Cloud Run
    // O Cloud Run aceita requisições do seu próprio domínio.
    // Você pode usar o valor 'true' para aceitar o próprio domínio do Cloud Run.
    'https://higor-backend-prod-107420039047.southamerica-east1.run.app', 
    'http://localhost:5173', // Para desenvolvimento local
    'http://localhost:8080', // Para desenvolvimento local
];

app.use(cors({
    origin: (origin, callback) => {
        // Permite requisições sem origem (como Postman ou mesma origem no Cloud Run)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error(`Origem ${origin} não permitida por CORS`), false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json()); 
app.use(mongoSanitizer); 

// 5. Configuração de Rotas
const agendamentoRoutes = require('./routes/agendamentoRoutes');
app.use('/api/agendamentos', agendamentoRoutes);

app.get('/', (req, res) => {
    res.send('Servidor backend da Clínica rodando!');
});


// 6. Lógica de Conexão Separada
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 10000, 
            socketTimeoutMS: 45000,
        });
        console.log('Conexão com MongoDB bem-sucedida!');
    } catch (err) {
        console.error('ERRO CRÍTICO ao conectar ao MongoDB:', err.message);
    }
};

// 7. Início da Aplicação
app.listen(PORT, () => { 
    console.log(`Servidor Express escutando na porta ${PORT}`);
    connectDB(); 
});