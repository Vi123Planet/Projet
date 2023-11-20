const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const corretorSchema = Schema({
    id: Number, 
    nome: String,
    idade: Number,
    cpf: String,
    codigo: Number,
    email: String

});

module.exports = mongoose.model("Corretor", corretorSchema);
