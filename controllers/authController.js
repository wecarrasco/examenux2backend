var joi = require('joi');
var boom = require('boom');
var user = require('../schemas/user');
var bcrypt = require('bcrypt');
var SHA3 = require('crypto-js/sha3');


exports.login = {
  auth: false,
  validate: {
    payload: {
      username: joi.string().required(),
      password: joi.string().min(2).max(200).required()
    }
  },
  handler: function(request, reply) {
    // console.log(request.payload.password);
    let password = String(SHA3(request.payload.password));
    user.find({username: request.payload.username}, function(err, user){
      if(!err && user){
        if (user.length > 0) {
          // request.cookieAuth.set(user[0]);
        	return reply({usuario: user[0].usuario, scope: user[0].scope, id:user[0]._id,  success: true, message: 'Login hecho exitosamente'});
        }else{
          return reply({success: false, message: boom.notFound(),tipo: 'length'});
        }
      }else if(!err){
        return reply({success: false, message: 'No se encontro el usuario', tipo:'null'});
      }else if(err){
      	return reply({success: false, message: boom.wrap(err, 'Error obteniendo el usuario'), tipo:'err'});
      }
    });
  }
};
exports.logout = {
    // auth: {
    //   mode:'required',
    //   strategy:'session'
    // },
    handler: function(request, reply) {
      request.cookieAuth.clear();
      return reply('Logout Successful!');
    }
  };
