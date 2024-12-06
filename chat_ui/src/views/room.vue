<template>
    <div class="room">
        <ul class="message">
            <li v-for="(item, index) in itemStore.chatMessages" :key="index">{{ item.type }}: {{ item.message }}</li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useItemStore } from "@/stores/item";
import { useConnectionStore } from "@/stores/connection";
import { socket } from "@/socket";
import { getData } from "@/indexdb";

const itemStore = useItemStore();
const connectionStore = useConnectionStore();

socket.off();
itemStore.bindEvents();
connectionStore.bindEvents();

onMounted(() => {
    getData()
        .then((data) => {
            itemStore.chatMessages.unshift(...data);
        })
        .catch((error) => {
            console.error("获取数据失败", error);
        });
});
</script>

<style lang="scss" scoped>
@import url("@/assets/style/views/room.scss");
</style>
