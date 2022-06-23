const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`Пользователь присоединился ID: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`Пользователь с ID: ${socket.id} присоединился к комнате: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("Пользователь отсоединился ID:", socket.id);
    });
});

server.listen(3001, () => {
    console.log("server running");
});
