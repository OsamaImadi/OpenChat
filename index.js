let express = require('express');
let socket = require('socket.io');

let app = express();
let server = app.listen(4000,()=>{
    console.log(`listening on port 4000`);
});

app.use(express.static('public'));

//Setting up socket
var io = socket(server);

io.on('connection',(socket)=>{
    console.log('Connection made to socket');

    socket.on('chat',(data)=>{
        io.emit('chat', data);
    });

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing', data);
    });
});