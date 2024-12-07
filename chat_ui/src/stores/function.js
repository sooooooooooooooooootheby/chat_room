import { defineStore } from "pinia";

export const useFunctionStore = defineStore("function", {
    state: () => ({
        message: {
            type: "",
            content: "",
        },
    }),

    actions: {
        log(type, content, time = 3000) {
            if (content === "") {
                return;
            }

            if (time < 0) {
                this.message.type = type;
                this.message.content = content;
                return;
            }

            this.message.type = type;
            this.message.content = content;

            setTimeout(() => {
                this.message.type = "";
                this.message.content = "";
            }, time);
        },
    },
});
