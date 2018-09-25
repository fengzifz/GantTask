<template>
    <div id="app">
        <el-container class="main-container" v-if="!$route.meta.noLeftMenu"
                      v-loading="loading"
                      element-loading-spinner="el-icon-loading">
            <el-aside width="200px">
                <el-row class="aside-avatar">
                    <el-col :span="24">
                        <router-link :to="'/personal/settings'">
                            <div class="avatar">
                                <img :src="host + '/storage/' + this.userAvatar" />
                            </div>
                            <div class="username">{{ name || '点击修改昵称' }}</div>
                        </router-link>
                    </el-col>
                </el-row>
                <el-row class="tac">
                    <el-col :span="24">
                        <el-menu
                            default-active="2"
                            class="el-menu-vertical-demo">
                            <router-link :to="'/team'">
                                <el-menu-item index="1">
                                    <i class="fa fa-users"></i>
                                    <span slot="title">团队</span>
                                </el-menu-item>
                            </router-link>
                            <router-link :to="'/'">
                                <el-menu-item index="2">
                                    <i class="fa fa-th-large"></i>
                                    <span slot="title">项目</span>
                                </el-menu-item>
                            </router-link>
                            <el-menu-item index="4" disabled>
                                <i class="fa fa-history"></i>
                                <span slot="title">动态(pending...)</span>
                            </el-menu-item>
                            <el-menu-item index="4" disabled>
                                <i class="fa fa-area-chart"></i>
                                <span slot="title">统计(pending...)</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
                <el-footer>
                    <div class="copyright">©2018 Gante.app</div>
                    <div class="version">{{ version }}</div>
                </el-footer>
            </el-aside>
            <el-container class="wrapper">
                <div class="main-content">
                    <el-header class="clearfix">
                        <div class="header-left">
                            <div class="breadcrump">
                                <router-link :to="'/'">{{ currentTeamName }}</router-link>
                                <span v-if="showInBreadcrumb">
                                    <i style="margin: 0 10px;" class="fa fa-angle-right"></i>
                                    <router-link :to="'/project/tasks'">{{ currentProjectName }}</router-link>
                                </span>
                            </div>
                        </div>
                        <div class="header-right">
                            <el-button v-if="currentTeamName" type="text" @click="setting">团队设置</el-button>
                            <label>/</label>
                            <el-button type="text" @click="logout">退出</el-button>
                        </div>
                    </el-header>
                    <router-view />
                </div>
            </el-container>
        </el-container>
        <el-container v-else>
            <router-view />
        </el-container>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import route from './router/index'
import axios from 'axios'
export default {
    name: 'App',
    data () {
        return {
            loading: false,
            version: process.env.VER,
            host: process.env.HOST
        }
    },
    computed: {
        ...mapState({
            apiToken: state => state.user.apiToken,
            userAvatar: state => state.user.userAvatar,
            name: state => state.user.name,
            currentTeamId: state => state.team.currentTeamId,
            currentTeamName: state => state.team.currentTeamName,
            currentProjectName: state => state.project.currentProjectName,
            showInBreadcrumb: state => state.project.showInBreadcrumb
        })
    },
    methods: {
        createBreadcrumbs: function () {
            let uri = this.$route.path
            let uriArr = uri.split('/').filter((item, index) => {
                return item.length !== 0
            })
            if (uriArr.length > 0 && uriArr[0] === 'project') {
                this.$store.dispatch('project/showBreadcrumb', true)
            } else {
                this.$store.dispatch('project/showBreadcrumb', false)
            }
        },
        checkLogin: function () {
            // 检查浏览器保存的 login 的状态
            let uri = this.$route.path
            let uriArr = uri.split('/')
            let mainUri = uriArr[1]
            if (!this.checkToken() &&
                mainUri !== 'join' &&
                mainUri !== 'register' &&
                mainUri !== 'forgot_password') {
                route.push('/login')
            }
        },
        checkToken: function () {
            let token = this.apiToken
            return !!(token && token !== null && token !== 'undefined' && token !== 'null' && token !== undefined)
        },
        checkCurrentTeam: function () {
            if (this.currentTeamId === 'undefined' || this.currentTeamName === 'undefined' ||
                !this.currentTeamId || !this.currentTeamName) {
                this.$message.info('请先创建或选择团队')
                route.push('/team')
            }
        },
        logout: function () {
            this.loading = true
            axios.get('user/logout?api_token=' + this.apiToken).then((res) => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$message.success(res.data.message)
                    this.$store.dispatch('user/logout')
                }
                this.loading = false
            })
        },
        setting: function () {
            route.push('/team_settings')
        }
    },
    created: function () {
        // 页面刷新时，检查用户是否有 current team，如果没有，跳转到 team 的页面
        // 这里应该只考虑用户登录成功后，跳转到 / 页面时，才做检查和跳转
        if (this.checkToken() && this.$route.path === '/') {
            this.checkCurrentTeam()
            this.createBreadcrumbs()
        } else {
            this.checkLogin()
        }
    },
    updated: function () {
        if (this.checkToken()) {
            this.checkCurrentTeam()
            this.createBreadcrumbs()
        }
        this.checkLogin()
    }
}
</script>

<style lang="scss">
    $asideWidth: 200px;
    html, body {
        padding: 0;
        margin: 0;
        height: 100%;
    }
    body {
        height: 100%;
        background-color: #F5F7FA;
        overflow-x: hidden;
    }
    body, p, li, ol, div, a {
        color: #3F587E;
        font-size: 14px;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        font-weight: 300;
        line-height: 18px;
        text-decoration: none;
    }
    a:hover {
        color: #009DA0;
    }
    p {
        margin-top: 0;
        margin-bottom: 14px;
    }
    #app {
        display: flex;
        flex: 1;
    }
    #app, .el-main .content, .wrapper {
        min-height: 100%;
    }
    .main-container {
        height: 100%;
    }
    .wrapper {
        width: 100%;
        padding-left: 230px;
        padding-right: 30px;
    }
    .main-content {
        padding: 0;
        width: 100%;
    }
    .title {
        text-align: left;
        color: #777;
        font-weight: 300;
    }
    .title .fa {
        font-size: 0.8em;
    }
    .content {
        width: 1112px;
        margin: 0 auto;
        background-color: #fff;
    }
    .el-header {
        padding-left: 0;
        padding-right: 0;
        padding-top: 20px;
        border-bottom: 1px solid #ddd;
    }
    .el-footer {
        text-align: center;
        position: fixed;
        bottom: 0;
        width: $asideWidth;
        padding: 0;
    }
    .el-footer .copyright {
        font-size: 14px;
    }
    .el-footer .version {
        font-size: 12px;
        font-weight: bold;
    }
    .el-header, .el-footer {
        background-color: transparent;
        color: #333;
        line-height: 60px;
    }
    .el-aside {
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        background-color: #fff;
        color: #333;
        text-align: center;
        line-height: 200px;
        -webkit-box-shadow: 0 0 18px 0 #d4dee6;
        -moz-box-shadow: 0 0 18px 0 #d4dee6;
        box-shadow: 0 0 18px 0 #d4dee6;
    }
    .el-main {
        background-color: #fff;
        color: #333;
        line-height: 160px;
        margin: 0 auto;
        overflow: unset;
        padding-left: 0;
        padding-right: 0;
    }
    .el-main-no-bg {
        background-color: transparent;
    }
    .el-main-fixed-width {
        width: 1112px;
    }
    .el-main-auto-width {
        width: auto;
    }
    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .line {
        height: 1px;
        width: 100%;
        border-top: 1px solid #ddd;
        margin: 30px 0;
    }
    .avatar {
        width: 80px;
        height: 80px;
        overflow: hidden;
        border-radius: 40px;
        text-align: center;
        margin: 30px auto 20px;
    }
    .avatar img {
        width: 100%;
        height: auto;
    }
    .breadcrump {
        padding: 12px 0;
    }
    .breadcrump a {
        color: #8FBC8F;
        font-weight: bold;
    }
    .el-header .header-left {
        float: left;
    }
    .el-header .header-right {
        float: right;
    }
    .aside-avatar {
        margin-bottom: 30px;
    }
    .aside-avatar .username {
        color: #000;
    }
</style>
