<template>
    <div id="login" v-loading="loading">
        <el-card class="box-card">
            <h1>注册</h1>
            <el-form :model="userInfo" status-icon ref="userInfo" label-width="100px">
                <el-input type="text" v-model="userInfo.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
                <p></p>
                <el-input type="password" v-model="userInfo.password" auto-complete="off" placeholder="请输入密码，至少包含6位数"></el-input>
                <p></p>
                <el-input type="password" v-model="userInfo.passwordAgain" auto-complete="off" placeholder="再次确认密码"></el-input>
                <p></p>
                <el-button @click="register" type="primary" size="small" class="register-btn">注册</el-button>
                <el-row class="bottom-row">
                    <el-col :span="20"><el-button type="text" @click="loginAction">已有账号?直接登录</el-button></el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import route from '../router'
import axios from 'axios'
import {mapState} from 'vuex'
export default {
    name: 'Register',
    data () {
        return {
            loading: false,
            userInfo: {email: '', password: '', passwordAgain: ''}
        }
    },
    computed: {
        ...mapState({
            // isLogin: state => state.user.isLogin
        })
    },
    methods: {
        register: function () {
            this.loading = true
            axios.post('user/register', {
                app_key: 'xxxxxxxx',
                email: this.userInfo.email,
                password: this.userInfo.password,
                password_confirmation: this.userInfo.passwordAgain
            }).then((res) => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$message.success(res.data.message)
                    this.$store.dispatch('user/logout')
                    route.push('/login')
                }
                this.loading = false
            })
        },
        checkLogin: function () {
            if (this.checkToken()) {
                route.push('/')
            }
        },
        checkToken: function () {
            let token = this.apiToken
            return !!(token && token !== null && token !== 'undefined' && token !== 'null' && token !== undefined)
        },
        loginAction: function () {
            route.push('/login')
        }
    },
    created: function () {
        this.checkLogin()
    },
    updated: function () {
        this.checkLogin()
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
    .register-btn {
        width: 100%;
    }
    .bottom-row p {
        text-align: center;
    }
</style>
