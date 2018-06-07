<template>
    <div id="app">
        <el-container>
            <el-aside class="sub-aside">
                <div class="breadcrumb">
                    <div v-for="(bc, index) in breadCrumb" :key="index">
                        <router-link v-if="breadCrumb.length !== index + 1" class="breadcrumb-item" :to="bc.path">
                            <span :class="'breadcrumb-icon ' + bc.iconCls"></span>
                        </router-link>
                        <span v-else :class="'breadcrumb-icon ' + bc.iconCls"></span>
                        <div v-if="breadCrumb.length !== index + 1" class="breadcrumb-divide">
                            <span class="el-icon-arrow-down"></span>
                        </div>
                    </div>
                </div>
            </el-aside>
            <el-aside class="main-aside">
                <div class="user-info">
                    <div class="avatar">
                        <router-link :to="'/member/settings'">
                            <img src="./assets/avatar/10.png" />
                        </router-link>
                    </div>
                    <span class="name">陈子峰</span>
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
import IconMap from './config/icon-map'
export default {
    name: 'App',
    data () {
        return {
            IconMap: IconMap,
            breadCrumb: []
        }
    },
    methods: {
        updateBreadCrumb: function () {
            this.breadCrumb = []
            let self = this
            let pathArr = this.$route.path.split('/').filter(function (el) {
                return el.length !== 0
            })

            if (pathArr.length === 0) {
                this.breadCrumb.push({
                    path: IconMap['project'].path,
                    iconCls: IconMap['project'].iconCls
                })
            }

            pathArr.forEach(function (el) {
                self.breadCrumb.push({
                    path: IconMap[el].path,
                    iconCls: IconMap[el].iconCls
                })
            })
        }
    },
    watch: {
        $route () {
            this.updateBreadCrumb()
        }
    },
    created: function () {
        this.updateBreadCrumb()
    }
}
</script>

<style>
    html, body {
        min-height: 100%;
    }
    body {
        padding: 0;
        margin: 0;
        background-color: #f4f7ed;
        color: #303133;
        font-size: 14px;
    }
    .fa {
        color: #eee;
    }
    .breadcrumb {
        text-align: center;
        padding-top: 30px;
    }
    .breadcrumb a {
        font-size: 14px;
    }
    .breadcrumb  span.breadcrumb-icon {
        color: #bfbfbf;
        font-size: 14px;
    }
    .breadcrumb a span.breadcrumb-icon {
        color: #8FBC8F;
    }
    .breadcrumb .breadcrumb-divide {
        margin: 10px 0;
    }
    .breadcrumb .breadcrumb-divide span {
        color: #303133;
        font-size: 12px;
    }
    .breadcrumb-active span.fa {
        color: #c0c4cc;
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
        border-right: 3px solid darkseagreen;
    }
    .sub-aside {
        width: 50px !important;
        background-color: #f5f7fa;
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
        border-radius: 60px;
        border: 1px solid transparent;
    }
    .avatar:hover {
        border-color: darkseagreen;
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
    .user-info {
        text-align: center;
        margin-bottom: 15px;
    }
    .user-info .name {
        font-size: 12px;
    }
</style>
