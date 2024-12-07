<template>
    <div class="initialize">
        <h2>开始</h2>
        <ul>
            <h3>使用帮助</h3>
            <li>本站点是终端风格的聊天室, 所以大部分操作都不需要鼠标, 使用键盘即可.</li>
            <li>按下 <pre>'/'</pre> 打开命令模式</li>
            <li>按下 <pre>'Enter'</pre> 打开消息模式发送消息</li>
            <li>按下 <pre>'ESC'</pre> 退出所有模式</li>
        </ul>
        <ul>
            <h3>设置一些信息</h3>
            <li>设置你的名字: 按下 <pre>'/'</pre> 打开命令模式, 输入 <pre>'/set name [your name]'</pre> 即可设置名字.</li>
        </ul>
        <ul>
            <h3>页面切换指令</h3>
            <li><pre>/help</pre> 打开帮助页面(当前页)</li>
            <li><pre>/setting</pre> 打开设置</li>
            <li><pre>/chat</pre> 打开聊天室</li>
        </ul>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
li {
    display: flex;
    align-items: center;

    pre {
        margin: 0 8px;
        color: aquamarine;
    }
}
</style>
