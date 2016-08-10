var ValidationFactory = function(req){
	this.req = req; 
};

ValidationFactory.prototype.nome = function(){
	this.req.checkBody('nome' , 'Nome é inválido').notEmpty().isLength({min: 3, max: 45});
	return this; 
};

ValidationFactory.prototype.sobreNome = function(){
	this.req.checkBody('sobrenome' , 'Sobrenome é inválido').notEmpty().isLength({min: 3, max: 45});
	return this; 
};

ValidationFactory.prototype.email = function(){
	this.req.checkBody('email', 'email invalido').notEmpty().isEmail();
	return this; 
};

ValidationFactory.prototype.apelido = function(){
	this.req.checkBody('apelido' , 'Apelido é inválido').notEmpty().isLength({min: 3, max: 45});
	return this; 
};

ValidationFactory.prototype.senha = function(){
	this.req.checkBody('senha' , 'Senha é inválido').notEmpty().isLength({min: 5, max: 10});
	return this; 
};

module.exports = ValidationFactory; 