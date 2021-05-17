import io from 'socket.io-client';

const socket = io("http://localhost:3000"); //  адресс сервера

export default socket;