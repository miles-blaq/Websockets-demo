const   express = require("express"),
        socket  = require("socket.io"),
        app     = express();

app.use(express.static("public"));

const io = socket(app.listen(3000,()=>{
    console.log("chat app connected");
}))

io.on("connection",(socket)=>{
    console.log("made socket connection",socket.id);

    socket.on("chat",(data)=>{
        io.sockets.emit("chat",data);
    })

    socket.on("typing",(data)=>{
        socket.broadcast.emit("typing",data);
    })
})
