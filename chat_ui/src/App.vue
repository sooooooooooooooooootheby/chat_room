<template>
    <div>
        <pre>
  /$$$$$$  /$$                   /$$
 /$$__  $$| $$                  | $$
| $$  \__/| $$$$$$$   /$$$$$$  /$$$$$$            /$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$/$$$$
| $$      | $$__  $$ |____  $$|_  $$_/           /$$__  $$ /$$__  $$ /$$__  $$| $$_  $$_  $$
| $$      | $$  \ $$  /$$$$$$$  | $$            | $$  \__/| $$  \ $$| $$  \ $$| $$ \ $$ \ $$
| $$    $$| $$  | $$ /$$__  $$  | $$ /$$        | $$      | $$  | $$| $$  | $$| $$ | $$ | $$
|  $$$$$$/| $$  | $$|  $$$$$$$  |  $$$$/        | $$      |  $$$$$$/|  $$$$$$/| $$ | $$ | $$
 \______/ |__/  |__/ \_______/   \___/          |__/       \______/  \______/ |__/ |__/ |__/
        </pre>
        <router-view></router-view>
        <inputc />
    </div>
</template>

<script setup>
import inputc from "@/components/input.vue";

const del = () => {
    const deleteRequest = indexedDB.deleteDatabase("chat_room");

    deleteRequest.onsuccess = function (event) {
        console.log("Database deleted successfully");
    };

    deleteRequest.onerror = function (event) {
        console.error("Error deleting database:", event.target.error);
    };

    deleteRequest.onblocked = function (event) {
        console.warn("Database deletion is blocked");
    };
};

// del();
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
    pre {
        width: 100vw;
        font-size: 0.3rem;
    }
}
</style>
