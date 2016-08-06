var mongoose = require('mongoose'); 

module.exports = (app) =>{

	var usuarioSchema = {
		nome : {type: String, required: true}, 
		email: {type: String, required: true, unique: true}, 
		senha: {type: String, required: true}, 
		idade: {type: Number, required: true}, 
		isAdm: {type: Boolean, required: true}
	}; 

	return mongoose.model('Usuario', usuarioSchema); 
}; 
