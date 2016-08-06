module.exports = (app) => {
	
	var Usuario = app.models.usuarioModel; 

	var controller = {
		create: (req, res, next) =>{
			var nome  = req.body.nome; 
			var email = req.body.email; 
			var senha = req.body.senha; 
			var idade = req.body.idade; 
			var isAdm = req.body.isAdm;

			var usuario = new Usuario({
				nome : nome, 
				email: email, 
				senha: senha, 
				idade: idade, 
				isAdm: isAdm
			}); 

			usuario.save((err, usuario) => {
				if(err){
					res.json({status: false, msg: err});
					return; 	
				}

				res.json({status: true }); 
			}); 
		}, 


		login: (req, res, next) => {
			var email = req.query.email; 
			var senha = req.query.senha; 

			var session = req.session; 

			Usuario.findOne({
				email: email, 
				senha: senha
			}).
			select('nome email idade isAdm'). 
			exec(function(error, usuario){
				if(error){
					res.json({status: false, msg: err});
					return; 
				}

				if(typeof usuario == 'undefined'){
					res.json({status: false, msg: err});
					return;
				}

				session.loginStatus = true;
				session.isAdm       = usuario.isAdm; 
				session._id         = usuario._id;
				
				res.redirect('/dash/index'); 
			}); 
		}, 


		logout: (req, res, next) =>{
			var session =  req.session; 

			session.loginStatus = false; 

			res.redirect('/login'); 
		}

	}; 

	return controller; 
}; 