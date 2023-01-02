		// import express 
		const express = require('express')
		// calling express 
		const app = express();
		// import http 
		const http = require('http');
		// import server class from the socket.io lib
		const { Server } = require('Socket.io');
		const ACTIONS = require('./src/Actions');
		// server 
		const server = http.createServer(app);
		// making instance of the server class 
		const io = new Server(server);
		const userSocketMap = {};
		// in this we will have something like :
		// {
		//     'id' : "username"
		// }
		// to get list of all the clients in the room
		function getAllConnectedClients(roomId){
		    // io.sockets.adapter.rooms.get is of the type MAP 
		    // so we convert it to array 
		    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
		        (socketId) => {
		            // in every iteration we return the foll obj 
		            return {
		                socketId, 
		                username: userSocketMap[socketId],
		            }
		    });
		}
		// when socket connects to the server this event is triggered
		io.on('connection', (socket) => {
		    console.log('socket connected', socket.id);
		    // the foll triggers whenever a client joins
		    socket.on(ACTIONS.JOIN, ({roomId, username}) => {
		        // we store the username and roomId in the socket map 
		        // key : socket.id, val : username 
		        userSocketMap[socket.id] = username;
		        // adding the client to the room
		        socket.join(roomId);
		        // now to alert every user that another has joined 
		        // we get the list of all the users currently in the party
		        const clients = getAllConnectedClients(roomId);
		        clients.forEach(({socketId}) => {
		            io.to(socketId).emit(ACTIONS.JOINED, {
		                clients, 
		                username, 
		                socketId: socket.id,
		            });
		        });
		        // now listening this info in the frontend to show to all the clients 
		    });
		    // socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
		    //     socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
		    // });
		    // socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
		    //     io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
		    // });
		    // socket.on('disconnecting', () => {
		    //     const rooms = [...socket.rooms];
		    //     rooms.forEach((roomId) => {
		    //         socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
		    //             socketId: socket.id,
		    //             username: userSocketMap[socket.id],
		    //         });
		    //     });
		    //     delete userSocketMap[socket.id];
		    //     socket.leave();
		    // });
		});
		
		const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));