// backend/routes/agendamentoRoutes.js

const express = require('express');
const router = express.Router(); 
const agendamentoController = require('../controllers/agendamentoController'); // Importa o Controller

// A rota apenas chama a função do Controller (Padrão MVC)
router.post('/', agendamentoController.createAgendamento);

module.exports = router;