var Server = require('socket.io'); 

module.exports = (app) =>{
	var server = null; 

	var methods = {

		start: (httpServer, port) => {
			server = new Server(httpServer); 
			//quando um um usuário conecta. 
			server.on('connection', (socket) =>{

				//mandar informações que um novo usuário entrou; 
				var msg = {
					nome: 'Server', 
					msg: 'Novo usuário conectado.'
				}; 

				server.sockets.emit('entrou', msg); 
				
				//roda quando um socket emit uma informação
				socket.on('info', function(data){
					socket._nome = data.nome; 
				}); 

				socket.on('disconnect', function(socket){
					//mandar informações que um usuário saiu; 
					var msg = {
						user_name: 'Server', 
						msg: 'Um usuário saiu da sala'
					}; 

					server.sockets.emit('saiu', msg); 
				}); 

				socket.on('mensagem', function(msg){
					server.sockets.emit('mensagem', msg);
				}); 

			}); 
		}, 

		chat: (req, res, next) =>{
			res.render('chat.html'); 
		}
	};  

	return methods; 
}; 