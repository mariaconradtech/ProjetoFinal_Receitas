const db = require("../models/ConnectDatabase");

class ReceitaRepository {
    async findAll(orderBy = "ASC") {
        const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
        const rows = await db.query(`SELECT * FROM Receita ORDER BY nome ${direction}`);
        return rows;
    }

    async findByName(nome) {
        const rows = await db.query(`SELECT * FROM Receita WHERE nome = ?`, [nome]);
        return rows.length > 0 ? rows[0] : null;
    }

    async create({ nome, ingrediente, preparo }) {
        const existingReceita = await this.findByName(nome);
        if (existingReceita) {
            throw new Error("Receita com esse nome já existe.");
        }

        const result = await db.query(
            `INSERT INTO Receita (nome, ingrediente, preparo) VALUES (?,?,?)`,
            [nome, ingrediente, preparo]
        );

        const [insertedReceitaRows] = await db.query(
            `SELECT nome, ingrediente, preparo FROM Receita WHERE nome = ?`, [nome]
        );
        return insertedReceitaRows;
    }

    async update(nome, { ingrediente, preparo }) {
        const params = [
            ingrediente || null,
            preparo || null,
            nome
        ];

        await db.query(
            `UPDATE Receita SET ingrediente = ?, preparo = ? WHERE nome = ?`, params
        );

        const [updatedReceitaRows] = await db.query(
            `SELECT nome, ingrediente, preparo FROM Receita WHERE nome = ?`, [nome]
        );
        return updatedReceitaRows;
    }

    async delete(nome) {
        const result = await db.query(
            `DELETE FROM Receita WHERE nome = ?`, [nome]
        );
        return result.affectedRows > 0;
    }
}

module.exports = new ReceitaRepository();