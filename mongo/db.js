'use strict';

var mongoose = require("mongoose"); 
mongoose.Promise = global.Promise;

module.exports = () => {
	
	mongoose.connect('mongodb://localhost/teste'); 

	const db = mongoose.connection; 
	
	db.on('error', (error) => {
		console.log(err);
	}); 

	db.on('open', () => {
		console.log('Mongo up'); 
	}); 
};