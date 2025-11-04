# Clinica Odontológica Dr. Higor - BACKEND

Este repositório hospeda a API RESTful e a lógica de negócios da clínica, responsável pela validação de dados, agendamento de consultas e envio de notificações via e-mail. A arquitetura segue o padrão MVC (Model-View-Controller) para organização.

## Tecnologias de Servidor

* **Runtime:** Node.js
* **Framework:** Express.js
* **Banco de Dados:** MongoDB (hospedado no Atlas)
* **ORM/Driver:** Mongoose
* **Notificações:** Nodemailer (via SMTP do Gmail)

## Configuração de Ambiente (.env)

O arquivo .env é obrigatório para a inicialização do servidor e não deve ser subido ao GitHub.

### Variáveis Essenciais:

```env
MONGODB_URI="[Sua URI de conexão do MongoDB Atlas]"
PORT=5000

# Credenciais de Envio de E-mail (Requer Senha de App do Gmail)
EMAIL_USER="seu_email_de_envio@gmail.com"
EMAIL_PASS="[Senha de App de 16 dígitos]"
EMAIL_DESTINATARIO="testefronspace@gmail.com"