import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/room.vue"),
        },
        {
            path: "/help",
            name: "help",
            component: () => import("../views/help.vue"),
        },
        {
            path: "/setting",
            name: "setting",
            component: () => import("../views/setting.vue"),
        },
    ],
});

router.beforeEach(async (to, from) => {
    const name = localStorage.getItem("name");
    if (!name && to.name !== "help") {
        return { name: "help" };
    }
});

export default router;
