var mongoose = require('mongoose');

var objectSchema = new mongoose.Schema({
  name : String//,
  //Agregar mas atributos

});

module.exports = mongoose.model('objectExamen', objectSchema);
