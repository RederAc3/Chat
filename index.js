const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const UserService = require('./UserService');
const userService = new UserService();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

io.on('conection', (socket) => {

    socket.on('join', (name) => {
        userService.addUser({
            id: socket.id,
            name
        });

        io.emit('update', {
            users: usersService.getAllUsers()
        });
    });

    socket.on('disonnect', () => {
        usersService.removeUser(socket.id);
        socket.broadcast.emit('update', {
            users: usersService.getAllUsers()
        });
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});