// backend/models/Agendamento.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Agendamento = sequelize.define('Agendamento', {
    nome_completo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data_nascimento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    data_agendamento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hora_agendamento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    mensagem: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    status: {
        type: DataTypes.ENUM('Pendente', 'Confirmado', 'Cancelado'),
        defaultValue: 'Pendente'
    },
    data_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'agendamentos',
    timestamps: false
});

module.exports = Agendamento;
