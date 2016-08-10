var SHA256 = require("crypto-js/sha256"); 
var ValidationFactory = require('../util/ValidationFactory'); 

module.exports = (app) => {
	
	var Usuario = app.models.usuarioModel; 

	var controller = {
		create: (req, res, next) =>{
			//Validação vem aqui: 
			var val = new ValidationFactory(req); 
			
			val.nome().email().senha(); 

			var error = req.validationErrors(); 

			if(error){
				//Criando uma mensagem de erro mais elaborada: 
				var result = {
					status: false, 
					msg: error
				}

				res.json(result); 
				return; 
			}

			var nome  = req.body.nome; 
			var email = req.body.email; 
			var senha = SHA256(req.body.senha).toString(); 
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
			var senha = SHA256(req.query.senha).toString(); 

			var session = req.session; 

			Usuario.findOne({
				email: email, 
				senha: senha
			}).
			select('nome email idade isAdm'). 
			exec(function(error, usuario){
				if(error){
					res.json({status: false, msg: error});
					return; 
				}

				if(typeof usuario == 'undefined'){
					res.json({status: false, msg: "Usuário não encontrado"});
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