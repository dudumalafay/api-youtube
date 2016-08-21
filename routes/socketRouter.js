module.exports = (app) =>{
	app.get('/chat', app.controllers.socketController.chat); 
}; 