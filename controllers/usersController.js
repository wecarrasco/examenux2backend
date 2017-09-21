var user = require('../schemas/user');
var boom = require('boom');
var SHA3 = require('crypto-js/sha3');


exports.createUser = {
    // auth: {
    //   mode:'try',
    //   strategy:'session'
    // },
    handler: function(request, reply) {
    var usuario = new user({
      username: request.payload.username,
      password: String(SHA3(request.payload.password))
    });

    usuario.save(function(err){
      if(!err){
        return reply({
          success: true
        })
      }else{
        return reply({
          success: false
        })
      }
    });
  }
}

exports.getUsuarios = {
  handler: function(request, reply){
    var usuarios = user.find({}, function(err, usuario){
      reply(usuarios);
    });
  }
}

exports.getUsuario = {
  handler: function(req, res){
    var idUser = req.query.id;
    user.findOne({_id: idUser}, function(err, Usuario){
      if(!err && Usuario){
        res(Usuario);
      }else if(!err){

      }
    });
  }
}

exports.buscarUsuario = {
  handler: function(req, res){
    var username = req.query.username;
    user.find({username: username}, function(err, Usuario){
      if(!err && Usuario){
        res(Usuario);
      }else if(!err){
        return res({
          success: false
        })
      }
    });
  }
}

exports.updateUsuario = {
  handler: function(req, res){
    user.findOne({username: req.params.username}, function(err, Usuario){
      if (err) {
        return res("error...:(");
      }else{
        Usuario.username = req.payload.username || Usuario.username;
        Usuario.password = String(SHA3(req.payload.password)) || Usuario.password;

        Usuario.save(function(err, Usuario){
          if (err) {
            return res("error 2... :(");
          }else{
            return res({Usuario: Usuario, success:true});
          }

        });
      }
    });
  }
}

exports.deleteUsuario = {
  handler: function(request, reply){
    user.find({username: request.params.username}).remove().exec();
    return reply('Usuario borrado con exito!!');
  }
}
