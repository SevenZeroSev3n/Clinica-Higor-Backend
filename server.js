// backend/server.js
require('dotenv').config(); 

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { connectDB } = require('./config/database');

const PORT = process.env.PORT || 8080; 

const app = express();

app.use(helmet()); 

const allowedOrigins = [
    'https://higor-backend-prod-107420039047.southamerica-east1.run.app', 
    'http://localhost:5173',
    'http://localhost:8080',
];

app.use(cors({
    origin: (origin, callback) => {
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

const agendamentoRoutes = require('./routes/agendamentoRoutes');
app.use('/api/agendamentos', agendamentoRoutes);

app.get('/', (req, res) => {
    res.send('Servidor backend da Clínica rodando!');
});

app.listen(PORT, () => { 
    console.log(`Servidor Express escutando na porta ${PORT}`);
    connectDB(); 
});
