const ReceitaRepository = require("../repositories/receita");

class ReceitaController {
    async index(request, response) {
        const { orderBy } = request.query;
        const receitas = await ReceitaRepository.findAll(orderBy);
        response.json(receitas);
    }

    async show(request, response) {
        const { nome } = request.params;

        if (!nome) {
            return response.status(400).json({ error: "validation_error", message: "Nome inválido" });
        }

        const receita = await ReceitaRepository.findByName(nome);

        if (!receita) {
            return response.status(404).json({ error: "not_found", message: "Receita não encontrada" });
        }

        response.json(receita);
    }

    async store(request, response) {
        const { nome, ingrediente, preparo } = request.body;

        if (!nome) {
            return response.status(400).json({ error: "validation_error", message: "O campo nome é obrigatório" });
        }

        if (!ingrediente || !preparo) {
            return response.status(400).json({ error: "validation_error", message: "Os campos ingrediente e preparo são obrigatórios" });
        }

        const existingReceita = await ReceitaRepository.findByName(nome);
        if (existingReceita) {
            return response.status(400).json({ error: "duplicate_entry", message: "Já existe uma receita com este nome" });
        }

        const receita = await ReceitaRepository.create({ nome, ingrediente, preparo });
        response.status(201).json(receita);
    }

    async update(request, response) {
        const { nome } = request.params;
        const { ingrediente, preparo } = request.body;

        if (!ingrediente || !preparo) {
            return response.status(400).json({ error: "validation_error", message: "Os campos ingrediente e preparo são obrigatórios para atualizar" });
        }

        const receita = await ReceitaRepository.findByName(nome);

        if (!receita) {
            return response.status(404).json({ error: "not_found", message: "Receita não encontrada" });
        }

        const updatedReceita = await ReceitaRepository.update(nome, { ingrediente, preparo });

        response.status(200).json({ message: "Receita atualizada", receita: updatedReceita });

    }

    async delete(request, response) {
        const { nome } = request.params;
        const receita = await ReceitaRepository.findByName(nome);

        if (!receita) {
            return response.status(404).json({ error: "not_found", message: "Receita não encontrada" });
        }

        await ReceitaRepository.delete(nome);
        response.sendStatus(204);
    }
}

module.exports = new ReceitaController();
