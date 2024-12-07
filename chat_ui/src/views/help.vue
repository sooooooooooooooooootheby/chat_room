<template>
    <div class="help">
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
        <h2>开始</h2>
        <ul>
            <h3>使用帮助</h3>
            <li>本站点是终端风格的聊天室, 所以大部分操作都不需要鼠标, 使用键盘即可.(为什么说大部分呢, 因为我还没找到解决滚动的方案)</li>
            <li>
                按下
                <pre>'/'</pre>
                打开命令模式
            </li>
            <li>
                按下
                <pre>'Enter'</pre>
                打开消息模式发送消息
            </li>
            <li>
                按下
                <pre>'ESC'</pre>
                退出所有模式
            </li>
        </ul>
        <ul>
            <h3>设置一些信息</h3>
            <li>
                设置你的名字: 按下
                <pre>'/'</pre>
                打开命令模式, 输入
                <pre>'/set name [your name]'</pre>
                即可设置名字.(如果不设置名字是无法进入聊天室的)
            </li>
        </ul>
        <ul>
            <h3>页面切换指令</h3>
            <li>
                <pre>/help</pre>
                打开帮助页面(当前页)
            </li>
            <li>
                <pre>/setting</pre>
                打开设置(还在施工)
            </li>
            <li>
                <pre>/chat</pre>
                打开聊天室
            </li>
        </ul>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.help {
    border: 1px solid #ffffff;
    margin: 12px;
    padding: 8px;
}
ul {
    margin: 12px 0;
    li {
        margin-top: 8px;
        margin-left: 24px;
        display: flex;
        align-items: center;

        pre {
            margin: 0 8px;
            color: aquamarine;
        }
    }
}
</style>
