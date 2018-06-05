<template>
    <div id="app">
        <el-container>
            <el-aside class="main-aside">
                <div class="avatar">
                    <img src="./assets/logo.png" />
                </div>
                <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span>项目</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-document"></i>
                        <span slot="title">汇报</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-time"></i>
                        <span slot="title">动态</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">设置</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header class="main-header">Header</el-header>
                <el-main>
                    <router-view/>
                </el-main>
                <el-footer class="main-footer">©2018 GantTask</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
    html, body {
        min-height: 100%;
    }
    body {
        padding: 0;
        margin: 0;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .el-container {
        min-height: 100%;
    }
    .main-aside {
        width: 100px !important;
        border-right: 2px solid darkseagreen;
    }
    .main-header {
        height: 40px !important;
        line-height: 40px;
        text-align: center;
    }
    .main-footer {
        height: 30px !important;
        text-align: center;
        line-height: 30px;
        font-size: 13px;
    }
    .avatar {
        border-radius: 25px;
        width: 50px;
        height: 50px;
        margin: 20px auto;
    }
    .avatar img {
        width: 50px;
        height: 50px;
    }
    #app .el-menu {
        border: none;
    }
</style>
