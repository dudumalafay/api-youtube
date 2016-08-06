'use strict';

const mongoose = require('mongoose');

module.exports = (app) => {
	const pokemonSchema = mongoose.Schema({
		nome: { type: String, require: true },
		ataque: { type: Number, require: true }
	});

	return mongoose.model('Pokemons', pokemonSchema);
}