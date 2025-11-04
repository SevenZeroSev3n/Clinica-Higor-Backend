// backend/models/Agendamento.js (AJUSTADO)
const mongoose = require('mongoose');

const agendamentoSchema = new mongoose.Schema({
    nome_completo: {
        type: String,
        required: true,
        trim: true
    },
    data_nascimento: {
        type: String, // Mudança: Agora String
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    data_agendamento: { 
        type: String, // <--- CORREÇÃO CRÍTICA: MUDADO DE 'Date' PARA 'String'
        required: true
    },
    hora_agendamento: { 
        type: String,
        required: true
    },
    endereco: {
        type: String,
        default: ''
    },
    mensagem: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['Pendente', 'Confirmado', 'Cancelado'],
        default: 'Pendente'
    },
    data_registro: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Agendamento', agendamentoSchema);