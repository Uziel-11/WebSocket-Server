const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const {Server} = require('socket.io');
const io = new Server(server, {
    cors: {
        methods: ['GET', 'POST']
    }
});

app.get('/', (req, res) =>{
    res.send('<h1> Respondiendo a la Solicitud </h1>');
});
app.get('/home', (req, res) =>{
    res.send('<h2> Bienvenido a nuestro Menu </h2>');
});

var historial = [];

io.on('connect', socket => {
    console.log("Nueva Conexion", socket.id);

    for (let i in historial){
        io.emit('dibujar', {line: historial[i]})
    }

    socket.on('trazo', (data)=>{
        historial.push(data.line);
        io.emit('dibujar', {line: data.line})
    });
});

server.listen(3000, ()=>{console.log('Servidor Inicializado')})