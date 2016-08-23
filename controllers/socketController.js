var Server = require('socket.io'); 
var SHA256 = require("crypto-js/sha256"); 

module.exports = (app) =>{
	var server = null; 
	//Vou armazenar todos os usuarios aqui. 
	var usuarios = {}; 

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
					var usuario = {
						nome: data.nome,
						hash: SHA256( new Date().toString() + data.nome ).toString(),//só pra garantir que a hash vai ser única
						status: 'online'
					}; 

					usuarios[usuario.hash] = usuario; 
					socket._hash = usuario.hash; 

					console.log(socket._hash); 

					var online = {
						online : usuarios
					}; 

					server.sockets.emit('info',online); 
				}); 

				socket.on('disconnect', function(){
					//mandar informações que um usuário saiu; 
					var msg = {
						nome: 'Server', 
						msg: 'Um usuário saiu da sala', 
						hash: socket._hash
					}; 

					server.sockets.emit('saiu', msg);

					delete usuarios[socket._hash];  
				}); 

				socket.on('mensagem', function(msg){
					console.log(msg); 
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