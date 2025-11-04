// backend/services/notificationService.js

const nodemailer = require('nodemailer');
const Agendamento = require('../models/Agendamento'); // Para tipagem (opcional)

// 1. Configuração do Nodemailer (Movida para Services)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Checagem de Conexão (Movida para Services)
transporter.verify(function (error, success) {
    if (error) {
        console.error("ERRO DE CONEXÃO SMTP DO NODEMAILER:", error.message);
    } else {
        console.log("Servidor SMTP (Nodemailer) pronto para envio!");
    }
});


// Função UNIFICADA para enviar e-mails (Lógica de Negócios)
const sendEmailNotifications = async (agendamento) => {
    const nomeCompleto = agendamento.nome_completo; 
    const hora = agendamento.hora_agendamento;
    const emailCliente = agendamento.email;

    // Fuso horário corrigido
    const dataAgendamentoString = `${agendamento.data_agendamento}T00:00:00`;
    const dataFormatada = new Date(dataAgendamentoString).toLocaleDateString('pt-BR'); 

    const senderAddress = `Clinica Dr. Higor <${process.env.EMAIL_USER}>`;

    // A. E-MAIL DE NOTIFICAÇÃO INTERNA
    const mailOptionsClinica = {
        from: senderAddress,
        to: process.env.EMAIL_DESTINATARIO,
        subject: `[NOVO] Agendamento Recebido de ${nomeCompleto}`,
        html: `
            <p>Um novo agendamento foi preenchido através do formulário de contato:</p>
            <ul>
                <li><strong>Nome:</strong> ${nomeCompleto}</li> 
                <li><strong>Nascimento:</strong> ${agendamento.data_nascimento}</li>
                <li><strong>Telefone:</strong> ${agendamento.telefone}</li>
                <li><strong>Email:</strong> ${emailCliente}</li>
                <li><strong>Data Agendamento:</strong> ${dataFormatada} às ${hora}</li>
                <li><strong>Endereço:</strong> ${agendamento.endereco || 'Não fornecido'}</li>
                <li><strong>Mensagem:</strong> ${agendamento.mensagem}</li>
            </ul>
            <p>Favor entrar em contato com o paciente para confirmação.</p>
        `,
    };

    // B. E-MAIL DE CONFIRMAÇÃO PARA O CLIENTE
    const mailOptionsCliente = {
        from: senderAddress,
        to: emailCliente, 
        subject: 'Confirmação: Solicitação de Agendamento Recebida',
        html: `
            <p>Olá, ${nomeCompleto}.</p>
            <p>Obrigado por entrar em contato com a Clínica Odontológica Dr. Higor!</p>
            <p>Recebemos sua solicitação de agendamento para o dia ${dataFormatada} às ${hora}.</p>
            <p>Um colaborador da clínica entrará em contato com você em breve para confirmar os detalhes e formalizar seu agendamento.</p>
            <br>
            <p>Atenciosamente,</p>
            <p>A Equipe da Clínica.</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptionsClinica);
        console.log(`[CLÍNICA] E-mail de notificação (Interno) enviado.`);
        
        await transporter.sendMail(mailOptionsCliente);
        console.log(`[CLIENTE] E-mail de confirmação enviado.`);
        return true;
    } catch (error) {
        console.error('ERRO FATAL NO ENVIO DE EMAIL:', error);
        return false;
    }
};

module.exports = { sendEmailNotifications };