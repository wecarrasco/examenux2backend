var objectExamen = require('../schemas/object_examen');

exports.getObjects = {
  // auth: {
  //   mode:'required',
  //   strategy:'session',
  //   scope: ['admin', 'regular']
  // },
  handler: function(request, reply){
    var objects = objectExamen.find({});
    reply(objects);
  }
}

exports.getObject = {
  handler: function(req, res){
    var objectName = req.query.name;
    user.findOne({name: objectName}, function(err, objectTraido){
      if(!err && objectTraido){
        res(objectTraido);
      }else if(!err){

      }
    });
  }
}

exports.createObject = {
    // auth: {
    //   mode:'try',
    //   strategy:'session'
    // },
    handler: function(request, reply) {
    var object = new objectExamen({
      name: request.payload.name
    });

    object.save(function(err){
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
};

exports.updateObject = {
  handler: function(req, res){
    objectExamen.findOne({name: req.params.name}, function(err, objectTraido){
      if (err) {
        return res("error...:(");
      }else{
        objectTraido.username = req.payload.name || objectTraido.name;

        objectTraido.save(function(err, objectTraido){
          if (err) {
            return res("error 2... :(");
          }else{
            return res({object: objectTraido, success:true});
          }

        });
      }
    });
  }
}

exports.deleteObject = {
  handler: function(request, reply){
    objectExamen.find({name: request.params.name}).remove().exec();
    return reply('Objeto borrado con exito!!');
  }
}
