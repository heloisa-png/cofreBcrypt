const bcrypt = require('bcrypt');
const contaRepository = require('../repositories/contaRepository');

const registrarConta = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: 'Preencha nome, email e senha.' });
        }

        const contaExistente = await contaRepository.buscarContaPorEmail(email);

        if (contaExistente) {
            return res.status(409).json({ mensagem: 'Este email já está cadastrado.' });
        }

        // Cria um hash da senha. A senha original não é salva no banco.
        const senha_hash = await bcrypt.hash(String(senha), 10);

        const novaConta = await contaRepository.criarConta(nome, email, senha_hash);

        return res.status(201).json({
            mensagem: 'Conta criada com sucesso.',
            conta: novaConta
        });
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ mensagem: 'Erro ao registrar conta.' });
    }
};

const fazerLogin = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ mensagem: 'Informe email e senha.' });
        }

        const conta = await contaRepository.buscarContaPorEmail(email);

        if (!conta) {
            return res.status(401).json({ mensagem: 'Email ou senha incorretos.' });
        }

        // Compara a senha digitada com o hash armazenado no banco.
        const senhaValida = await bcrypt.compare(String(senha), conta.senha_hash);

        if (!senhaValida) {
            return res.status(401).json({ mensagem: 'Email ou senha incorretos.' });
        }

        return res.status(200).json({ mensagem: 'Login realizado com sucesso.' });
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ mensagem: 'Erro ao fazer login.' });
    }
};

module.exports = { registrarConta, fazerLogin };
