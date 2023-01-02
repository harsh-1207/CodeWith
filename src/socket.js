// import { Server } from 'socket.io';
import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    return io(process.env.REACT_APP_BACKEND_URL, options);
};
// The port or URL of server.js is given by : process.env.REACT_APP_BACKEND_URL