const { Server } = require("socket.io");

const port = 8421;
const path = "/chat_room/";

const io = new Server(port, {
    cors: {
        origin: "*",
    },
    path: path,
});

io.on("connection", (socket) => {
    // io.emit("chat message", {
    //     type: "system",
    //     message: `${socket.id} entered the chat!`,
    // });

    socket.on("chat message", (msg) => {
        io.emit("chat message", {
            type: "user",
            message: msg,
        });
    });
});

console.clear();
console.log(`server running at http://localhost:${port}`);
console.log(`test: "curl 'http://localhost:${port}${path}?EIO=4&transport=polling' -v"`);
