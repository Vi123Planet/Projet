const express = require("express");
const routes = express.Router();

const usuarioController = require("../controllers/UsuarioController");

const auth = require("../middlewares/usuarioAuth");

routes.post("/usuarios", usuarioController.cadastrar);
routes.get("/usuarios/cadastrar", usuarioController.cadastrarGet);
routes.get("/usuarios", auth, usuarioController.listar);
routes.get("/usuarios/deletar/:id", auth, usuarioController.remover);
routes.get("/usuarios/atualizar/:id", auth, usuarioController.atualizar);


routes.post("/usuarios/login", usuarioController.loginPost);
routes.get("/usuarios/login", usuarioController.loginGet);
routes.get("/usuarios/logout", usuarioController.logOut);




routes.get("/usuarios/:id", usuarioController.detalhar);
module.exports = routes;