const express = require('express');
const { dirname } = require('path');
const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 8000
http.listen(PORT, () =>{
    console.log(`Listening to the port ${PORT}`)
})

app.use(express.static(__dirname + '/js'))

app.get('/', (req, res) =>{
    res.sendFile(__dirname, '/index.html')
})

const io = require('socket.io')(http)

io.on('connection', (socket) =>{
    console.log("conneted.....")

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})