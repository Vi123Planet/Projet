const ClienteModel = require("../models/ClienteModel");
const clientes = [];
const Cliente = require("../Cliente");

class ClienteController {
  static cadastrar(req, res) {
    const cliente = req.body;
    clientes.push(new Cliente(cliente.id, cliente.nome, cliente.idade));
    res.redirect("/clientes?s=1");
  }

  static listar(req, res) {
    const salvo = req.query.s;
    res.render("cliente/relatorio", { clientes, salvo });
  }

  static detalhar(req, res) {
    const id = req.params.id;
    for (const f of clientes) {
      if (f.id == id) {
        res.render("cliente/detalhar", { f });
        break;
      }
    }
  }

  
  static cadastrarGet(req, res) {
      
    res.render("cliente/cadastrar")
  }

}

module.exports = ClienteController;
