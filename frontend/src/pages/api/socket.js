import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  // listening to connection event
  io.on("connection", (socket) => {
    console.log(`== user connected: ${socket.id}`)

    // user sends a message
    // socket.on("send-message", (obj) => {
    //   io.emit("receive-message", obj);
    // });

    socket.on("join_room", (data) => {
      socket.join(data)
      console.log(`user ${socket.id} joined room ${data}`)
    }) 

    // message received will container room id in data
    socket.on("send_message", (data) => {
      console.log("==data", data)
      socket.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnet", () => {
      console.log("==user disconnected", socket.id)
    })
  });

  console.log("Setting up socket");
  res.end();
}