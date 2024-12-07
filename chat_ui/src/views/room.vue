<template>
    <div class="room">
        <ul class="message">
            <li v-for="(item, index) in state.chatMessages" :key="index">{{ item.type }}: {{ item.message }}</li>
        </ul>
    </div>
</template>

<script setup>
import { state } from "@/socket";
</script>

<style lang="scss" scoped>
@import url("@/assets/style/views/room.scss");
</style>
