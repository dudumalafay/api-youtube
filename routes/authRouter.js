module.exports = (app) => {
	app.use('/dash/*', app.controllers.authController.verifyWeb); 
	app.use('/adm/*', app.controllers.authController.verifyAdm); 
}