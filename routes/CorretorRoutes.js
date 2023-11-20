const express = require("express");
const routes = express.Router();

const auth = require("../middlewares/usuarioAuth");

const corretorController = require("../controllers/CorretorController");

routes.post("/corretores", auth, corretorController.cadastrar);
routes.get("/corretores", auth, corretorController.listar);
routes.get("/corretores/cadastrar", auth,  corretorController.cadastrarGet);
routes.get("/corretores/:id", auth, corretorController.detalhar);
routes.get("/corretores/deletar/:id", auth,  corretorController.remover);
routes.get("/corretores/atualizar/:id", auth,  corretorController.atualizar);
module.exports = routes;