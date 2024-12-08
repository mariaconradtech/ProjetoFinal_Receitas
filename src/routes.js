const { Router } = require("express"); 
const ReceitaController = require("./app/controllers/receita");  
const routes = Router(); 

// Lista todas as receitas
routes.get("/receitas", ReceitaController.index);

// Busca uma receita específica pelo nome
routes.get("/receitas/:nome", ReceitaController.show);

// Cria uma nova receita
routes.post("/receitas", ReceitaController.store);

// Atualiza uma receita existente pelo nome
routes.put("/receitas/:nome", ReceitaController.update);

// Exclui uma receita pelo nome
routes.delete("/receitas/:nome", ReceitaController.delete);

module.exports = routes;