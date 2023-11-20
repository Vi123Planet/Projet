const express = require("express");
const routes = express.Router();

const auth = require("../middlewares/usuarioAuth");

const imovelController = require("../controllers/ImovelController");

routes.post("/imoveis", auth,  imovelController.cadastrar);
routes.get("/imoveis", auth,  imovelController.listar);
routes.get("/imoveis/cadastrar", auth,  imovelController.cadastrarGet);
routes.get("/imoveis/:id", auth,  imovelController.detalhar);
routes.get("/imoveis/deletar/:id", auth,  imovelController.remover);
routes.get("/imoveis/atualizar/:id", auth, imovelController.atualizar);
module.exports = routes;