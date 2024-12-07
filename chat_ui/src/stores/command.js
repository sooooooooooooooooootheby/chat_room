import { defineStore } from "pinia";
import { useFunctionStore } from "./function";

/*
在你的代码中，问题的根源在于你在 Pinia store 中直接使用了 useFunctionStore() 来访问另一个 store (functionStore)。这会导致 Pinia 的生命周期问题，因为 useFunctionStore() 需要依赖于已初始化的 Pinia 实例，而你在 store 的定义时就尝试访问它，这会导致 getActivePinia() 报错。
为了正确地访问 functionStore，你应该在 store 的 setup 函数或组件的 setup 函数中使用 useFunctionStore，而不是在 store 的定义中直接使用它。
import { useFunctionStore } from "./function";
const functionStore = useFunctionStore();
*/

export const useCommandStore = defineStore("command", {
    state: () => ({}),

    actions: {
        set(key, value) {
            const functionStore = useFunctionStore(); // 在使用的时候再调用

            switch (key) {
                case "name":
                    try {
                        localStorage.setItem("name", value);
                        functionStore.log("success", "名字设置成功");
                    } catch (error) {
                        functionStore.log("error", error);
                    }
                    break;
                default:
                    functionStore.log("warn", "未知指令");
                    break;
            }
        },
    },
});
