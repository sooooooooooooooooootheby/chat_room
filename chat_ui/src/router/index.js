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
            path: "/setting",
            name: "setting",
            component: () => import("../views/setting.vue"),
        },
    ],
});

export default router;
