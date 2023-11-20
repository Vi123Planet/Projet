const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imovelSchema = Schema({
  id: Number,
  localizaçao: String,
  proprietario: String,
  valor: Number
});

module.exports = mongoose.model("Imovel", imovelSchema);
