// backend/controllers/agendamentoController.js
const Agendamento = require('../models/Agendamento');
const agendamentoValidationSchema = require('../validation/agendamentoSchema');
const notificationService = require('../services/notificationService');

exports.createAgendamento = async (req, res) => {
    const { error, value } = agendamentoValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ 
            message: `Erro de validação: ${error.details[0].message}` 
        });
    }

    const { 
        name, birthdate, phone, email, 
        'scheduling-date': schedulingDate, 
        'scheduling-time': schedulingTime, 
        address, message 
    } = value;

    const localDateTimeString = `${schedulingDate}T${schedulingTime}:00`;
    const preferredDateTime = new Date(localDateTimeString);
    
    const now = new Date();

    if (preferredDateTime < now) {
        return res.status(400).json({ 
            message: 'A data e hora de agendamento não podem ser no passado. Por favor, escolha uma data futura.' 
        });
    }

    try {
        const agendamentoSalvo = await Agendamento.create({
            nome_completo: name, 
            data_nascimento: birthdate,
            telefone: phone,
            email: email,
            data_agendamento: schedulingDate, 
            hora_agendamento: schedulingTime, 
            endereco: address,
            mensagem: message,
        });
        
        notificationService.sendEmailNotifications(agendamentoSalvo); 

        res.status(201).json({ 
            message: 'Agendamento criado e e-mails de notificação iniciados.', 
            agendamento: agendamentoSalvo 
        });
        
    } catch (error) {
        console.error('Erro interno do servidor:', error);
        
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: `Erro de Sequelize: ${messages.join(', ')}` });
        }

        res.status(500).json({ 
            message: 'Erro interno do servidor ao processar o agendamento.' 
        });
    }
};
