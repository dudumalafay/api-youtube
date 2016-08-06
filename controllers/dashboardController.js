module.exports = (app) => {
		
	var Usuario = app.models.usuarioModel; 

	var controller = {
		index: (req, res, next) =>{
			var id = req.session._id;

			Usuario.findOne({
				_id: id
			}). 
			exec(function(error, usuario){
				if(error){
					res.send('Erro 500'); 
					return;
				}

				res.json({msg: "área restrita. Bem-vindo : "+ usuario.nome}); 
			}); 
		}
	}; 

	return controller; 
}; 