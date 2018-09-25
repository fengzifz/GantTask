<template>
    <el-main id="login">
        <el-card class="box-card"
                 element-loading-spinner="el-icon-loading"
                 :element-loading-text="loadingText"
                 v-loading="loading">
            <h1>加入团队「{{ teamName }}」</h1>
            <el-form :model="userInfo" status-icon ref="userInfo" label-width="100px" v-if="!isRegister">
                <el-input type="text" v-model="userInfo.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
                <p></p>
                <el-input type="password" v-model="userInfo.password" auto-complete="off" placeholder="请输入密码，至少包含6位数"></el-input>
                <p></p>
                <el-input type="password" v-model="userInfo.passwordAgain" auto-complete="off" placeholder="再次确认密码"></el-input>
                <p></p>
                <button @click="register" class="join-btn">注册并加入该团队</button>
            </el-form>
            <el-form :model="userInfo" status-icon ref="userInfo" label-width="100px" v-if="isRegister">
                <el-input type="text" v-model="userInfo.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
                <p></p>
                <el-input type="password" v-model="userInfo.password" auto-complete="off" placeholder="请输入密码"></el-input>
                <p></p>
                <button @click="login" class="join-btn">登录并加入该团队</button>
                <el-row class="bottom-row">
                    <el-col :span="20"><el-button type="text" @click="forgotAction">忘记密码?</el-button></el-col>
                </el-row>
            </el-form>
        </el-card>
    </el-main>
</template>

<script>
import route from '../router'
import axios from 'axios'
import {mapState} from 'vuex'
export default {
    name: 'Join',
    data () {
        return {
            loading: false,
            userInfo: {email: this.$route.params.email, password: '', passwordAgain: ''},
            isRegister: false,
            teamName: this.$route.params.name,
            loadingText: '加载中...',
            appKey: 'xxxxxxxx'
        }
    },
    computed: {
        ...mapState({
            apiToken: state => state.user.apiToken
        })
    },
    created: function () {
        this.checkEmail()
        this.checkLogin()
    },
    updated: function () {
        this.checkLogin()
    },
    methods: {
        checkEmail: function () {
            // 判断当前email是否注册，若注册了，显示login界面，直接输入登录密码，验证加入后跳转到首页
            // 若没有注册，则显示注册界面
            // (this.$route.params.flag === '1') ? this.noRegister = true : this.isRegister = true
            this.$route.params.flag === '1' ? this.isRegister = true : this.isRegister = false
        },
        register: function () {
            this.loading = true
            // 1. 注册
            axios.post('user/register', {
                app_key: 'xxxxxxxx',
                email: this.userInfo.email,
                password: this.userInfo.password,
                password_confirmation: this.userInfo.passwordAgain
            }).then((res) => {
                if (res.data.error && res.data.code !== 3) {
                    this.$message.error(res.data.message)
                    this.loading = false
                } else {
                    if (res.data.code === 3) {
                        this.loadingText = '你已经注册'
                    } else {
                        this.loadingText = res.data.message
                    }
                    // 2. 登录
                    this.loadingText = '正在登录...'
                    this.attemptToLogin()
                }
            })
        },
        login: function () {
            this.attemptToLogin()
        },
        attemptToLogin: function () {
            this.loading = true
            // 把登录抽离出来，可以调用
            axios.post('user/login', {
                app_key: this.appKey,
                email: this.userInfo.email,
                password: this.userInfo.password
            }).then(res => {
                if (res.data.error) {
                    this.$message.error('发生错误，请重试')
                    this.loading = false
                } else {
                    this.loadingText = '验证成功，正在加入团队...'
                    // 登录成功
                    let token = res.data.data.api_token
                    this.joinTeam(token)
                }
            })
        },
        joinTeam: function (apiToken) {
            axios.post('team/join', {
                email: this.userInfo.email,
                team_id: this.$route.params.id,
                api_token: apiToken
            }).then(res => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    // 加入团队成功，提示并做页面跳转
                    this.$message.success(res.data.message)
                    this.$store.dispatch('user/login', {
                        apiToken: apiToken,
                        userId: res.data.data.user_id,
                        userAvatar: res.data.data.avatar
                    })
                }
                this.loading = false
            })
        },
        forgotAction: function () {
            route.push('/users/forgot_password')
        },
        checkLogin: function () {
            if (this.checkToken()) {
                this.joinTeam(this.apiToken)
                route.push('/')
            }
        },
        checkToken: function () {
            let token = this.apiToken
            return !!(token && token !== null && token !== 'undefined' && token !== 'null' && token !== undefined)
        }
    }
}
</script>

<style scoped>
    #login {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        background-color: #8abef5;
    }
    .box-card {
        width: 388px;
        margin: auto;
        background-color: #fff;
    }
    .box-card h1 {
        text-align: center;
    }
    .join-btn {
        width: 100%;
        height: 35px;
        color: white;
        background-color: #4CAF50;
        border: none;
        border-radius: 3px;
        font-size: 12pt;
    }
    .bottom-row p {
        text-align: center;
    }
</style>
