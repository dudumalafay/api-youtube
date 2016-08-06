'use strict';

const mongoose = require("mongoose"); 

module.exports = () => {
	
	mongoose.connect('mongodb://localhost/pokemons'); 

	const db = mongoose.connection; 
	
	db.on('error', (error) => {
		console.log(err);
	}); 

	db.on('open', () => {
		console.log('Mongo up'); 
	}); 
};