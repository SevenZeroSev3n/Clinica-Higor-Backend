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
// CRÍTICO: Usa a porta do ambiente (8080 no Cloud Run) ou 5000 localmente.
const PORT = process.env.PORT || 8080; 


// 3. Checagem de Segurança
if (!MONGODB_URI) {
    console.error("FATAL ERROR: MONGODB_URI não está definida.");
    process.exit(1);
}


// 4. Inicializar o Express
const app = express();

// 5. Middlewares
app.use(helmet()); 
app.use(express.json()); 
app.use(mongoSanitizer); 

app.use(cors({
    origin: '*', 
}));


// 6. Configuração de Rotas
const agendamentoRoutes = require('./routes/agendamentoRoutes');
app.use('/api/agendamentos', agendamentoRoutes);

app.get('/', (req, res) => {
    // Resposta de saúde imediata para o Cloud Run
    res.send('Servidor backend da Clínica rodando!');
});


// 7. Lógica de Conexão Separada (Não bloqueia o app.listen)
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Conexão com MongoDB bem-sucedida!');
    } catch (err) {
        console.error('ERRO CRÍTICO ao conectar ao MongoDB:', err.message);
    }
};


// 8. INÍCIO DA APLICAÇÃO (Ação Padrão para Docker/Cloud Run)
app.listen(PORT, () => { 
    console.log(`Servidor Express escutando na porta ${PORT}`);
    // Inicia a conexão com o DB APÓS o servidor Express estar ativo
    connectDB(); 
});