const CorretorModel = require("../models/CorretorModel");
const corretores = [];
const Corretor = require("../Corretor");

class CorretorController {
  static async cadastrar(req, res) {
    if(req.body._id == ""){
      
    const novoCorretor = new CorretorModel({
      id: req.body.id,
      nome: req.body.nome,
      idade: req.body.idade,
      cpf: req.body.cpf,
      codigo: req.body.codigo,
      email: req.body.email

    });
    await novoCorretor.save();
      res.redirect("/corretores?s=1");
    } else {
      await CorretorModel.findOneAndUpdate({_id: req.body._id},
        {
          nome: req.body.nome,
          idade: req.body.idade,
          cpf: req.body.cpf,
          codigo: req.body.codigo, 
          email: req.body.email

        });
        res.redirect("/corretores?s=3")
    }
  }

  static async listar(req, res) {
    const status = req.query.s;
    const corretores = await CorretorModel.find();

    res.render("corretor/relatorio", { corretores, status });

    // const id = req.params.id;
    // const corretor = await CorretorModel.findOneAndDelete({id: id});
    // const removido = req.query.r;
    // // res.redirect("/corretores?r=2")
    // res.render("corretor/relatorio",  { corretores, salvo, removido })
  }

  static async detalhar(req, res) {
    const id = req.params.id;
    const corretor = await CorretorModel.findOne({ id: id });
    res.render("corretor/detalhar", { corretor });
  }

  static async cadastrarGet(req, res) {
    const id = req.params.id;
    const corretor = {};
    // await CorretorModel.findOneAndUpdate({id:id});
    res.render("corretor/cadastrar", { corretor });
  }

  static async remover(req, res) {
    const id = req.params.id;
    await CorretorModel.findOneAndDelete({ id: id });
    res.redirect("/corretores?s=2");
  }

  static async atualizar(req, res) {
    let id = req.params.id;
    // await CorretorModel.findOneAndUpdate({id:id});
    const corretor = await CorretorModel.findOne({ id: id });
    res.render("corretor/cadastrar", { corretor });

    // res.redirect("/corretores?s=1")
  }
}

module.exports = CorretorController;
