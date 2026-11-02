const express = require('express');
const cors = require('cors');
const contaRoutes = require('./src/routes/contaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/contas', contaRoutes);

module.exports = app;
