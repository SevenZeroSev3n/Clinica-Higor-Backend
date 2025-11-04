// backend/controllers/agendamentoController.js

const Agendamento = require('../models/Agendamento');
const agendamentoValidationSchema = require('../validation/agendamentoSchema');
const notificationService = require('../services/notificationService'); // Importa o Serviço

exports.createAgendamento = async (req, res) => {
    
    // 1. Validação Joi
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

    // 2. Validação de Data/Hora no Futuro (Lógica de Negócios)
    const localDateTimeString = `${schedulingDate}T${schedulingTime}:00`;
    const preferredDateTime = new Date(localDateTimeString);
    
    const now = new Date();

    if (preferredDateTime < now) {
        return res.status(400).json({ 
            message: 'A data e hora de agendamento não podem ser no passado. Por favor, escolha uma data futura.' 
        });
    }

    try {
        // 3. Salva no MongoDB (Model)
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
        
        // 4. ENVIA OS EMAILS (Service)
        // Isso não bloqueia a resposta se o email falhar.
        notificationService.sendEmailNotifications(agendamentoSalvo); 

        // 5. Resposta de sucesso
        res.status(201).json({ 
            message: 'Agendamento criado e e-mails de notificação iniciados.', 
            agendamento: agendamentoSalvo 
        });
        
    } catch (error) {
        console.error('Erro interno do servidor:', error);
        
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: `Erro de Mongoose: ${messages.join(', ')}` });
        }

        res.status(500).json({ 
            message: 'Erro interno do servidor ao processar o agendamento.' 
        });
    }
};