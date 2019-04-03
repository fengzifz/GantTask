<template>
    <div id="login">
        <el-card class="box-card" v-loading="loading"
                 element-loading-spinner="el-icon-loading">
            <h1>登录</h1>
            <el-form :model="userInfo" status-icon ref="userInfo" label-width="100px">
                <el-input type="text" v-model="userInfo.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
                <p></p>
                <el-input type="password" v-model="userInfo.password" auto-complete="off" placeholder="请输入密码"></el-input>
                <p></p>
                <button @click="login" class="login-btn">登录</button>
                <el-row class="bottom-row">
                    <el-col :span="20"><el-button type="text" @click="forgotAction">忘记密码?</el-button></el-col>
                    <el-col :span="4"><el-button type="text" @click="registerAction">立即注册</el-button></el-col>
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
    name: 'Login',
    data () {
        return {
            loading: false,
            userInfo: {email: '', password: ''}
        }
    },
    computed: {
        ...mapState({
            apiToken: state => state.user.apiToken
        })
    },
    methods: {
        login: function () {
            this.loading = true
            axios.post('/user/login', {
                email: this.userInfo.email,
                password: this.userInfo.password
            }).then((res) => {
                console.log(res)
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$message.success(res.data.message)
                    this.$store.dispatch('user/login', {
                        apiToken: res.data.data.api_token,
                        userId: res.data.data.user_id,
                        userAvatar: res.data.data.avatar,
                        name: res.data.data.name
                    })
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
        forgotAction: function () {
            route.push('/forgot_password')
        },
        registerAction: function () {
            route.push('/register')
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
    .login-btn {
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
