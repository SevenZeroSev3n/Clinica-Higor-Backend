// backend/server.js
require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const mongoSanitizer = require('./middleware/mongoSanitizer');
const cors = require('cors');

const MONGODB_URI = process.env.MONGODB_URI; 
const PORT = process.env.PORT || 8080; 

if (!MONGODB_URI) {
    console.error("FATAL ERROR: MONGODB_URI não está definida.");
    process.exit(1);
}

const app = express();

// Middlewares de Segurança e CORS
app.use(helmet()); 
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json()); 
app.use(mongoSanitizer); 

// Rotas
const agendamentoRoutes = require('./routes/agendamentoRoutes');
app.use('/api/agendamentos', agendamentoRoutes);

app.get('/', (req, res) => {
    res.send('Servidor backend da Clínica rodando!');
});

// Lógica de Conexão Separada
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

// Início da Aplicação
app.listen(PORT, () => { 
    console.log(`Servidor Express escutando na porta ${PORT}`);
    connectDB(); 
});