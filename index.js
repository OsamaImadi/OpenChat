let express = require('express');
let socket = require('socket.io');

let app = express();
let server = app.listen(4000,()=>{
    console.log(`listening on port 4000`);
});

app.use(express.static('public'));

//Setting up socket
var io = socket(server);

//gathering data from other open sockets
io.on('connection',(socket)=>{
    console.log('Connection made to socket');

    //working with chat
    socket.on('chat',(data)=>{
        io.emit('chat', data);
    });

    //working with 'is typing'
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing', data);
    });
});