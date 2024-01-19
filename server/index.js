const express = require("express");
const exp = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const chatRoute = require('./Routes/NewChatServer')
const internalMark = require('./Routes/NewInternalMark')
const FileUpload = require('./Routes/FileUpload')
const StudentManage = require('./Routes/StudentManage')


exp.use(cors());
exp.use(express.json());

exp.use(chatRoute);
exp.use(internalMark);
exp.use(FileUpload);
exp.use(StudentManage);

const server = http.createServer(exp);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("join_room", (data) => {
    if (socket.room) {
      socket.leave(socket.room);
      console.log("leaved from ", socket.room);
    }
    socket.join(data);
    console.log("joined in ", data, "  pre room ", socket.room);
    socket.room = data;
  });

  socket.on("SendMsg", (data) => {
    console.log(JSON.stringify(data));
    console.log(data);
    socket.to(socket.room).emit("recived_msg", data);
  });
  socket.on("SendFil", (data) => {
    console.log(data);
    socket.to(socket.room).emit("recived_fil", data);
  });


  socket.on('join-room', (roomId, userVideoStream) => {
    // Join the specified room
    socket.join(roomId);

    // Broadcast to all clients in the room that a new user has connected
    socket.to(roomId).emit('user-connected', socket.id, userVideoStream);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3333, () => {
  console.log("server started......");
});
