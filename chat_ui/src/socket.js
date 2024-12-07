import { reactive } from "vue";
import { io } from "socket.io-client";
import { getData, addData } from "@/indexdb";

export const state = reactive({
    connected: false,
    chatMessages: [],
});

export const socket = io("http://localhost:8421", {
    path: "/chat_room/",
});

socket.on("connect", () => {
    state.connected = true;
    getData()
        .then((data) => {
            state.chatMessages.unshift(...data);
        })
        .catch((error) => {
            console.error("获取数据失败", error);
        });
});

socket.on("disconnect", () => {
    state.connected = false;
});

// 监听服务器发送的消息
socket.on("chat message", (message) => {
    state.chatMessages.push(message);
    addData(message);
});

// 发送消息并存储到 IndexedDB
export const sendMessage = (message) => {
    socket.emit("chat message", message);
};
