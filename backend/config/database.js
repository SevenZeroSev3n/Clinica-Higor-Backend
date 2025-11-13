// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Check if the DATABASE_URL is for a local environment
const isLocal = process.env.DATABASE_URL && process.env.DATABASE_URL.includes('localhost');

const options = {
  dialect: 'postgres',
  protocol: 'postgres',
};

// Only add SSL options if it's NOT a local connection
if (!isLocal) {
  options.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  };
}

const sequelize = new Sequelize(process.env.DATABASE_URL, options);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com PostgreSQL bem-sucedida!');
    await sequelize.sync();
    console.log('Modelos sincronizados com o banco de dados.');
  } catch (error) {
    console.error('ERRO CRÍTICO ao conectar ou sincronizar com o PostgreSQL:', error);
  }
};

module.exports = { sequelize, connectDB };
