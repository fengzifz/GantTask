<template>
    <el-main id="login"
             element-loading-spinner="el-icon-loading"
             v-loading="loading">
        <el-card class="box-card">
            <h1 v-if="isSend">重新设置密码</h1>
            <h1 v-if="isDone">邮件已发送</h1>
            <el-form :model="userInfo" status-icon ref="userInfo" label-width="100px" v-if="isSend">
                <el-input type="email" v-model="userInfo.email" auto-complete="off" placeholder="请输入登陆邮箱"></el-input>
                <p></p>
                <el-button type="primary" class="send-btn" @click="send">发送重设密码地址</el-button>
            </el-form>
            <el-form :model="userInfo" status-icon ref="userInfo" label-width="100px" v-if="isDone" class="doneView">
                <h3>一封邮件已经发送至你的邮箱</h3>
                <h3>{{ this.userInfo.email }}</h3>
                <h3>请跟随邮件里的引导来重设你的登录密码</h3>
            </el-form>
        </el-card>
    </el-main>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
    name: 'ForgotPassword',
    data () {
        return {
            loading: false,
            userInfo: {email: '', password: ''},
            isSend: true,
            isDone: false
        }
    },
    computed: {
        ...mapState({
            apiToken: state => state.user.apiToken
        })
    },
    methods: {
        send: function () {
            this.loading = true
            axios.post('user/send_reset_pwd', {
                api_token: this.apiToken,
                email: this.userInfo.email
            }).then((res) => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$message.success(res.data.message)
                    this.isSend = false
                    this.isDone = true
                }
                this.loading = false
            }).catch((err) => {
                console.log(err)
                this.loading = false
            })
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
        width: 500px;
        margin: auto;
        background-color: #fff;
    }
    .box-card h1 {
        text-align: center;
    }
    .send-btn {
        width: 100%;
    }
    .doneView h3 {
        text-align: center;
        font-size: 16px;
    }
</style>
