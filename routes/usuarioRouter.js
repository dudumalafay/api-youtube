module.exports = (app) =>{
	app.post('/create', app.controllers.usuarioController.create); 
	app.get('/login', app.controllers.usuarioController.login);
	app.get('/logout', app.controllers.usuarioController.logout); 
}; 