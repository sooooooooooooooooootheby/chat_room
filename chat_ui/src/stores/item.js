import { defineStore } from "pinia";
import { socket } from "@/socket";
import { addData } from "@/indexdb";

export const useItemStore = defineStore("item", {
    state: () => ({
        chatMessages: [],
    }),

    actions: {
        bindEvents() {
            // 监听服务器发送的消息
            socket.on("chat message", (message) => {
                this.chatMessages.push(message);
                addData(message);
            });
        },

        // 发送消息并存储到 IndexedDB
        sendMessage(message) {
            socket.emit("chat message", message);
        },
    },
});
