const pool = require('../config/db');

const criarConta = async (nome, email, senha_hash) => {
    const resultado = await pool.query(
        'INSERT INTO contas (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING id, nome, email',
        [nome, email, senha_hash]
    );

    return resultado.rows[0];
};

const buscarContaPorEmail = async (email) => {
    const resultado = await pool.query(
        'SELECT * FROM contas WHERE email = $1',
        [email]
    );

    return resultado.rows[0];
};

module.exports = { criarConta, buscarContaPorEmail };
