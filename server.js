const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const io = socketio(server);

app.use(express.static("public"));

io.on("connection", (connectedSocket) => {
  console.log("A user connected");

  connectedSocket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  connectedSocket.on("typing", (data) => {
    connectedSocket.broadcast.emit("typing", data);
  });

  connectedSocket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
