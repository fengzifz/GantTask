<template>
    <div id="app">
        <el-container>
            <el-aside class="main-aside">
                <div class="avatar">
                    <img src="./assets/avatar/10.png" />
                </div>
                <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo">
                    <router-link :to="'/'">
                        <el-menu-item index="1">
                            <i class="el-icon-menu"></i>
                            <span>项目</span>
                        </el-menu-item>
                    </router-link>
                    <router-link :to="'/'">
                        <el-menu-item index="2">
                            <i class="el-icon-document"></i>
                            <span slot="title">汇报</span>
                        </el-menu-item>
                    </router-link>
                    <router-link :to="'/'">
                        <el-menu-item index="3">
                            <i class="el-icon-time"></i>
                            <span slot="title">动态</span>
                        </el-menu-item>
                    </router-link>
                    <router-link :to="'/'">
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">设置</span>
                        </el-menu-item>
                    </router-link>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
        <el-footer class="main-footer">©2018 GantTask</el-footer>
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
        /*background-color: #B1D7D2;*/
        background-color: #f4f7ed;
        color: #303133;
        font-size: 14px;
    }
    .fa {
        color: #eee;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 50px auto;
        width: 1200px;
    }
    a {
        text-decoration: none;
        color: #303133;
    }
    a:visited, a:hover, a:active {
        color: inherit;
    }
    #app, .el-container {
        min-height: 650px;
    }
    #app > .el-container {
        box-shadow: 0 1px 10px 0 rgba(0, 0, 0, .1);
        background-color: #fff;
    }
    .main-aside {
        width: 100px !important;
        border-right: 2px solid darkseagreen;
    }
    .main-footer {
        height: 50px !important;
        text-align: center;
        line-height: 50px;
        font-size: 13px;
    }
    .avatar {
        width: 60px;
        height: 60px;
        margin: 20px auto;
    }
    .avatar img {
        width: 60px;
        height: 60px;
        border-radius: 60px;
    }
    #app .el-menu {
        border: none;
    }
    .el-checkbox__inner {
        width: 16px;
        height: 16px;
    }
</style>
