let socket = io.connect('http://localhost:4000');

//Query DOM

let message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', ()=>{
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

//Event listener for pressing key to show 'is typing'
message.addEventListener('keypress',()=>{
    socket.emit('typing', handle.value);
});

//Listening for event
socket.on('chat', (data)=>{
    feedback.innerHTML='';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

//Displaying is typing in chat app
socket.on('typing',(data)=>{
    feedback.innerHTML = '<p><em>' +data + ' is typing a message..</em></p>';
});