import { reactive } from "vue";
import { io } from "socket.io-client";
import { getData, addData } from "@/indexdb";
import { useFunctionStore } from "./stores/function";

// 控制连接状态的开关
export const state = reactive({
    connected: false,
    chatMessages: [],
    usersOnline: [],
    socket: null,
});

const name = localStorage.getItem("name");

// 启动 WebSocket 连接
export const connectSocket = () => {
    const functionStore = useFunctionStore();

    if (state.connected) {
        functionStore.log("success", "服务器已经连接");
        return;
    }

    state.socket = io("http://localhost:8421", {
        path: "/chat_room/",
    });

    state.socket.on("connect", () => {
        state.connected = true;
        functionStore.log("success", "服务器连接成功");

        if (name) {
            state.socket.emit("init", { userName: name });
        }

        // 获取数据
        getData()
            .then((data) => {
                state.chatMessages.unshift(...data);
            })
            .catch((error) => {
                functionStore.error("error", "获取数据失败" + error);
            });
    });

    // 监听断开连接
    state.socket.on("disconnect", () => {
        state.connected = false;
        functionStore.log("error", "服务器连接断开", -1);
    });

    // 监听服务器消息
    state.socket.on("chat message", (message) => {
        state.chatMessages.push(message);
        addData(message);
    });

    state.socket.on("usersOnline", (users) => {
        state.usersOnline = users;
    })
};

// 停止 WebSocket 连接
export const disconnectSocket = () => {
    const functionStore = useFunctionStore();

    if (!state.connected) {
        functionStore.log("error", "服务器未连接", -1);
        return;
    }

    state.socket.disconnect();
    state.connected = false;
    functionStore.log("error", "服务器连接已断开", -1);
};

// 发送消息
export const sendMessage = (message) => {
    const functionStore = useFunctionStore();

    if (state.socket && state.connected && name) {
        state.socket.emit("chat message", name, message);
    } else {
        functionStore.error("error", "Socket 未连接或已断开", -1);
    }
};
