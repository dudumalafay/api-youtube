module.exports = (app) =>{
	app.get('/dash/index', app.controllers.dashboardController.index ); 
	app.get('/adm/index', app.controllers.dashboardController.index ); 
}; 