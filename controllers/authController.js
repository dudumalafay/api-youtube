module.exports = (app) =>{

	var controller = {
		verifyWeb: (req,  res, next) => {
			var session = req.session; 

			if(!session.loginStatus){
				res.send('Faça o login primeiro.'); 
				return;
			}
			
			next(); 
		}, 

		verifyAdm: (req, res, next) => {
			var session = req.session; 

			console.log(session.isAdm); 
			
			if(!session.loginStatus || !session.isAdm){
				res.send('Você não é um adminstrador.'); 
				return;
			}
			
			next(); 
		}
	}; 

	return controller; 
}