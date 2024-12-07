import { defineStore } from "pinia";

export const useFunctionStore = defineStore("function", {
    state: () => ({
        message: {
            type: "",
            content: ""
        },
    }),

    actions: {
        log(type, content) {
            this.message.type = type;
            this.message.content = content;

            setTimeout(() => {
                this.message.type = "";
                this.message.content = "";
            }, 3000);
        }
    },
});
