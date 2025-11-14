# Clínica Higor - API RESTful

## Descrição

API RESTful para o projeto **Clínica Higor**, desenvolvida para gerenciar agendamentos de consultas.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção da API.
- **Sequelize**: ORM para o PostgreSQL.
- **PostgreSQL**: Banco de dados relacional.
- **Dotenv**: Gerenciamento de variáveis de ambiente.
- **Nodemailer**: Módulo para envio de e-mails.

## Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/clinica-higor-backend.git
    ```
2.  **Acesse o diretório do projeto:**
    ```bash
    cd clinica-higor-backend
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```

## Uso

1.  **Configure as variáveis de ambiente:**

    Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

    ```
    PORT=8080
    DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<database-name>
    EMAIL_USER=seu-email@gmail.com
    EMAIL_PASS=sua-senha-de-app
    ```

2.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run start:dev
    ```
    O servidor estará disponível em `http://localhost:8080`.

## Endpoints da API

- `POST /api/agendamentos`: Cria um novo agendamento.
- `GET /api/agendamentos`: Retorna todos os agendamentos.
- `GET /api/agendamentos/:id`: Retorna um agendamento específico.
- `PUT /api/agendamentos/:id`: Atualiza um agendamento.
- `DELETE /api/agendamentos/:id`: Deleta um agendamento.

---
