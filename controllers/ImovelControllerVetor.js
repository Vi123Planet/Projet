const ImovelModel = require("../models/ImovelModel");
const imoveis = [];
const Imovel = require("../Imovel");

class ImovelController {
  static async cadastrar(req, res) {
    if (req.body._id == "") {
      const novoImovel = new ImovelModel({
        id: req.body.id,
        localizaçao: req.body.localizaçao,
        proprietario: req.body.proprietario,
        valor: req.body.valor,
      });
      await novoImovel.save();
      res.redirect("/imoveis?s=1");
    } else {
      await ImovelModel.findOneAndUpdate(
        { _id: req.body._id },
        {
          id: req.body.id,
          localizaçao: req.body.localizaçao,
          proprietario: req.body.proprietario,
          valor: req.body.valor
        }
      );
      res.redirect("/imoveis?s=3");
    }
  }

  static async listar(req, res) {
    const status = req.query.s;
    const imoveis = await ImovelModel.find();

    res.render("imovel/relatorio", { imoveis, status });

    // const id = req.params.id;
    // const imovel = await ImovelModel.findOneAndDelete({id: id});
    // const removido = req.query.r;
    // // res.redirect("/imoveis?r=2")
    // res.render("imovel/relatorio",  { imoveis, salvo, removido })
  }

  static async detalhar(req, res) {
    const id = req.params.id;
    const imovel = await ImovelModel.findOne({ id: id });
    res.render("imovel/detalhar", { imovel });
  }

  static async cadastrarGet(req, res) {
    const id = req.params.id;
    const imovel = {};
    // await ImovelModel.findOneAndUpdate({id:id});
    res.render("imovel/cadastrar", { imovel });
  }

  static async remover(req, res) {
    const id = req.params.id;
    await ImovelModel.findOneAndDelete({ id: id });
    res.redirect("/imoveis?s=2");
  }

  static async atualizar(req, res) {
    let id = req.params.id;
    // await ImovelModel.findOneAndUpdate({id:id});
    const imovel = await ImovelModel.findOne({ id: id });
    res.render("imovel/cadastrar", { imovel });

    // res.redirect("/imoveis?s=1")
  }
}

module.exports = ImovelController;
