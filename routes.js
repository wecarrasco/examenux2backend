var objectOneController = require('./controllers/objectOneController');
var usersController = require('./controllers/usersController');
var authController = require('./controllers/authController');

exports.endpoints = [{method: 'GET', path: '/', config: {handler: function(request, reply){reply('API v1, Students')}}},
	{method: 'POST', path: '/v1/register', config: usersController.createUser},
	{method: 'GET', path: '/v1/usuarios', config: usersController.getUsuarios},
	{method: 'GET', path: '/v1/usuario', config: usersController.getUsuario},
	{method: 'GET', path: '/v1/buscarusuario/', config: usersController.buscarUsuario},
	{method: 'PUT', path: '/v1/updateusuario/{username}', config: usersController.updateUsuario},
	{method: 'DELETE', path: '/v1/deleteusuario/{username}', config: usersController.deleteUsuario},
	{method: 'GET', path: '/v1/objects', config: objectOneController.getObjects},
	{method: 'GET', path: '/v1/object', config: objectOneController.getObject},
	{method: 'POST', path: '/v1/createobject', config: objectOneController.createObject},
	{method: 'PUT', path: '/v1/updateobject/{name}', config: objectOneController.createObject},
	{method: 'DELETE', path: '/v1/deleteobject/{name}', config: objectOneController.deleteObject},
	{method: 'POST', path: '/v1/login', config: authController.login},
	{method: 'GET', path: '/v1/logout', config: authController.logout}
];
