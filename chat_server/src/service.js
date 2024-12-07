const { Server } = require("socket.io");

const port = 8421;
const path = "/chat_room/";

const io = new Server(port, {
    cors: {
        origin: "*",
    },
    path: path,
});

const usersOnline = [];

io.on("connection", (socket) => {
    socket.on("init", (data) => {
        usersOnline.push({
            id: socket.id,
            name: data.userName,
        });
        io.emit("usersOnline", usersOnline);
    });

    socket.on("chat message", (name, msg) => {
        io.emit("chat message", {
            type: "user",
            name: name,
            message: msg,
        });
    });

    socket.on("disconnect", () => {
        usersOnline.splice(
            usersOnline.findIndex((user) => user.id === socket.id),
            1
        );
        io.emit("usersOnline", usersOnline);
    });
});

console.clear();
console.log(`server running at http://localhost:${port}`);
console.log(`test: "curl 'http://localhost:${port}${path}?EIO=4&transport=polling' -v"`);
