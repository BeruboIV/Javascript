const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(http);
const PORT = process.env.PORT || 5000;

const users = {};

// Middlewares
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
    console.log(`A user has connected : ${socket.id}`);
    socket.on("new-user", (name) => {
        users[socket.id] = name;
        socket.broadcast.emit("user-joined", name);
    });

    socket.on("chat-message", (info) => {
        socket.broadcast.emit("send-message", info);
    });

    socket.on("disconnect", () => {
        console.log(`The user has disconnected : ${socket.id}`);
    });
});

http.listen(PORT, () => {
    console.log(`App running at PORT ${PORT}`);
});
