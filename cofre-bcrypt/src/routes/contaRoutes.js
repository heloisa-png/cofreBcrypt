const express = require('express');
const router = express.Router();
const contaController = require('../controllers/contaController');

router.post('/registrar', contaController.registrarConta);
router.post('/login', contaController.fazerLogin);

module.exports = router;
