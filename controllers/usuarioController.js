module.exports = (app) => {
	
	var Usuario = app.models.usuarioModel; 

	var controller = {
		create: (req, res, next) =>{
			req.checkBody('nome' , 'O Nome é inválido').notEmpty().isLength({min: 3, max: 45});
			req.checkBody('email', 'O Email é inválido').notEmpty().isEmail();
			req.checkBody('senha', 'O Senha é inválido').notEmpty().isLength({min: 6, max: 16});

			//porque a idade precisa ser diferente de vazia e inteira. 
			
			req.checkBody('idade', 'O Idade é inválido').notEmpty().isInt({min: 10, max: 120});
			req.checkBody('isAdm', 'O dado de adminstrador é inválido').notEmpty(); 

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