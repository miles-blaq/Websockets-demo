// Make connection
const socket = io.connect('http://localhost:3000');

// Query DOM
const message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

//emit      
btn.addEventListener("click",()=>{
    socket.emit("chat",{
        message:message.value,
        handle: handle.value
    });
});

socket.on("chat",(data)=>{
    feedback.innerHTML = "";
    output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
    message.value = "";
})
//broadcast
message.addEventListener("keypress",()=>{
    socket.emit("typing",handle.value);
})

socket.on("typing",(data)=>{
    feedback.innerHTML = `<p><em>${data} is typing a message..</em></p>`;
});