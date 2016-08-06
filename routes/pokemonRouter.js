'use strict';

module.exports = (app) => {
	app.get('/create', app.controllers.pokemonControllers.create)
}