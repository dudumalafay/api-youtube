'use strict';

module.exports = (app) => {
	const pokemonModel = app.models.pokemonModel;

	const constroller = {
		create: (req, res, next) => {
			const nome = req.query.nome;
			const ataque = req.query.ataque;

			const novoPokemonModel = new pokemonModel({
				nome: nome,
				ataque: ataque
			});

			novoPo0kemonModel.save( (error, sucesso) => {
				if(error){
					res.json({error: error});
				}

				res.json({sucesso: sucesso});
			});
		},
		//	retriver:
		//	update:
		//	delete:
	};

	return constroller;
};