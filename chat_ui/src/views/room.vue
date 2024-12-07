<template>
    <div class="room">
        <div class="message">
            <span v-for="(item, index) in state.chatMessages" :key="index">{{ item.name }}: {{ item.message }}</span>
        </div>
        <div class="user">
            <ul>
                <p>服务器状态: {{ state.connected }}</p>
                <span>当前在线:</span>
                <li v-for="(item, index) in state.usersOnline" :key="index">{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { state } from "@/socket";
</script>

<style lang="scss" scoped>
@import url("@/assets/style/views/room.scss");
</style>
