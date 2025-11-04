// backend/validation/agendamentoSchema.js
const Joi = require('joi');

// A variável 'today' não é mais necessária aqui, pois a regra .min() será removida da string
const agendamentoSchema = Joi.object({
    // Validação de Nome
    name: Joi.string().min(3).trim().required(), 

    // Data de Nascimento (String)
    birthdate: Joi.string().required(), 

    // Telefone
    phone: Joi.string().pattern(/^\d{10,11}$/).required().messages({
        'string.pattern.base': 'O telefone deve conter 10 ou 11 dígitos, apenas números.'
    }), 

    // Email
    email: Joi.string().email().required(), 

    // Data de Agendamento: Removida a regra .min(today) para evitar o AssertError
    'scheduling-date': Joi.string().required(), 

    // Hora de Agendamento
    'scheduling-time': Joi.string().required(), 

    // Endereço e Mensagem
    address: Joi.string().allow('').optional(),
    message: Joi.string().max(500).allow('').optional()
});

module.exports = agendamentoSchema;