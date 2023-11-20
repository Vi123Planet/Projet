const { default: mongoose } = require("mongoose");
const UsuarioModel = require("../models/UsuarioModel");

const bcryptjs = require("bcryptjs");

class UsuarioController {
  static async cadastrar(req, res) {
    const salt = bcryptjs.genSaltSync();
    const hash = bcryptjs.hashSync(req.body.senha, salt);

    let usuario = await UsuarioModel.findOne({ email: req.body.email });
    if (usuario === null) {
      if (req.body._id == "") {
        //cadastrar
        const novoUsuario = new UsuarioModel({
          id: req.body.id,
          nome: req.body.nome,
          email: req.body.email,
          senha: hash
        });
        await novoUsuario.save();
        res.redirect("/usuarios?s=1");
      } else {

        await UsuarioModel.findOneAndUpdate(
          { _id: req.body._id },
          {
            id: req.body.id,
            nome: req.body.nome,
            email: req.body.email,
            senha: hash
          }
        );
        res.redirect("/usuarios?s=3");
      }
    } else {
      res.redirect(
        `usuarios/cadastrar?s=1&nome=${req.body.nome}&email=${req.body.email}&senha=${req.body.senha}`
      );
    }
  }

  static async listar(req, res) {
    const status = req.query.s;
    const usuarios = await UsuarioModel.find();

    res.render("usuario/relatorio", { usuarios, status });

    // const id = req.params.id;
    // const usuario = await UsuarioModel.findOneAndDelete({id: id});
    // const removido = req.query.r;
    // // res.redirect("/usuarios?r=2")
    // res.render("usuario/relatorio",  { usuarios, salvo, removido })
  }

  static async detalhar(req, res) {
    const id = req.params.id;
    const usuario = await UsuarioModel.findOne({ id: id });
    res.render("usuario/detalhar", { usuario });
  }

  static async cadastrarGet(req, res) {
    const id = req.params.id;
    let usuario = {
      id: req.body.id,
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
    };
    const status = req.query.s;

    if (id != undefined) {
      //atualização
      usuario = await UsuarioModel.findOne({ _id: _id });
    }

    await UsuarioModel.findOneAndUpdate({ id: id });
    res.render("usuario/cadastrar", { usuario, status });
  }

  static async remover(req, res) {
    const id = req.params.id;
    await UsuarioModel.findOneAndDelete({ id: id });
    res.redirect("/usuarios?s=2");
  }

  static async atualizar(req, res) {
    const status = req.query.s;

    let id = req.params.id;
    // await UsuarioModel.findOneAndUpdate({id:id});
    const usuario = await UsuarioModel.findOne({ id: id });
    res.render("usuario/cadastrar", { usuario, status });

    // res.redirect("/usuarios?s=1")
  }

  static async loginGet(req, res) {
    //carrega a página
    const status = req.query.s;
    res.render("usuario/login", { status });
  }

  static logOut(req, res){
    req.session.usuario = null;
    res.redirect("/usuarios/login")
  }

  static async loginPost(req, res) {
    let senha = req.body.senha;
    

    const usuario = await UsuarioModel.findOne({ email: req.body.email });
    if (usuario != null) {
      if (bcryptjs.compareSync(senha, usuario.senha)) {
        req.session.usuario = usuario.email;
        res.redirect("/");
      } else {
        //senha inválida
        res.redirect("/usuarios/login?s=1");
      }
    } else {
      //email inválido
      res.redirect("/usuarios/login?s=2");
    }
  }

}

module.exports = UsuarioController;
