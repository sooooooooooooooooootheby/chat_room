<template>
    <div class="container">
        <div class="tips" v-if="functionStore.message.content">
            <p :class="functionStore.message.type">[{{ functionStore.message.type }}]: {{ functionStore.message.content }}</p>
        </div>
        <div :class="{ input, active: mode }">
            <span class="mode">{{ mode }}</span>
            <input type="text" v-model="userInput" @keydown.enter="handleInput" ref="input" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useFunctionStore } from "@/stores/function";
import { useCommandStore } from "@/stores/command";

const functionStore = useFunctionStore();
const commandStore = useCommandStore();

const input = ref();
const userInput = ref(""); // 输入
const mode = ref(null); // 当前模式
const clickListenerAdded = ref(false); // 标记是否添加了 click 事件监听器
const router = useRouter();

// 点击事件处理函数 必须使用具名函数而不是匿名函数 否则不能卸载监听器
const handleClick = () => {
    input.value.focus();
};

// 键盘事件处理函数
const handleKeyDown = (event) => {
    if (event.key === "Escape") {
        mode.value = null;
        userInput.value = "";
        input.value.blur();
        removeClickListener();
        return;
    }

    if (mode.value === "command" || mode.value === "message") {
        return;
    }

    if (event.key === "/") {
        mode.value = "command";
        input.value.focus();
        addClickListener();
    } else if (event.key === "Enter") {
        mode.value = "message";
        input.value.focus();
        addClickListener();
    }
};

// 添加 click 事件监听器
const addClickListener = () => {
    if (!clickListenerAdded.value) {
        document.addEventListener("click", handleClick);
        clickListenerAdded.value = true;
    }
};

// 移除 click 事件监听器
const removeClickListener = () => {
    if (clickListenerAdded.value) {
        document.removeEventListener("click", handleClick);
        clickListenerAdded.value = false;
    }
};

// 在 mounted 时添加键盘事件监听
onMounted(() => {
    document.addEventListener("keydown", handleKeyDown);
});

// 在 beforeUnmount 时移除键盘事件监听
onBeforeUnmount(() => {
    document.removeEventListener("keydown", handleKeyDown);
    removeClickListener();
});

// 处理回车
const handleInput = () => {
    if (mode.value === "message") {
        itemStore.sendMessage(userInput.value);
        userInput.value = "";
        return;
    }

    switch (true) {
        case userInput.value === "/setting":
            router.push("/setting");
            break;
        case userInput.value.startsWith("/set"):
            const key = userInput.value.split(" ")[1];
            const value = userInput.value.split(" ")[2];
            commandStore.set(key, value);
            break;
        case userInput.value === "/help":
            router.push("/help");
            break;
        case userInput.value === "/chat":
            router.push("/");
            break;
        default:
            functionStore.log("warn", "未知指令")
            break;
    }
    userInput.value = "";
};

// 添加键盘监听
onMounted(() => {
    document.addEventListener("keydown", handleKeyDown);
});
</script>

<style lang="scss" scoped>
.container {
    width: calc(100vw - 16px);
    position: fixed;
    bottom: 8px;
    left: 8px;

    .tips {
        width: 100%;

        p {
            margin: 0;
        }
        .error {
            color: red;
        }
        .warn {
            color: yellow;
        }
        .success {
            color: green;
        }
    }
    .input {
        height: 0;
        overflow: hidden;
        display: flex;
        align-items: center;

        input {
            width: 100%;
            border: none;
            outline: none;
            padding: 6px;
            font-size: 14px;
            background-color: transparent;
            color: #ffffff;
        }
    }
    .active {
        height: auto;
    }
}
</style>
