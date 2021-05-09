const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(http);
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
    console.log(`A user has connected : ${socket.id}`);
    socket.on("chat-message", (msg) => {
        // console.log(msg);
        // io.emit("chat-message", msg);
        socket.broadcast.emit("chat-message", msg);
    });

    socket.on("disconnect", () => {
        console.log(`The user has disconnected : ${socket.id}`);
    });
});

http.listen(PORT, () => {
    console.log(`App running at PORT ${PORT}`);
});
