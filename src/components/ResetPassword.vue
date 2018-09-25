<template>
    <div id="login" v-loading="loading">
        <el-card class="box-card">
            <h1 v-if="isSet">重新设置密码</h1>
            <h1 v-if="isDone">设置成功</h1>
            <el-form :model="userInfo" status-icon ref="userInfo" label-width="100px" v-if="isSet">
                <el-input type="password" v-model="userInfo.password" auto-complete="off" placeholder="请输入新的密码"></el-input>
                <p></p>
                <button class="send-btn" @click="send">重设密码</button>
            </el-form>
            <el-form :model="userInfo" status-icon ref="userInfo" label-width="100px" v-if="isDone">
                <button class="goto-login-btn" @click="login" type="text">重新登录GantTask开始你的工作吧</button>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import router from '../router/index'
export default {
    name: 'ResetPassword',
    data () {
        return {
            loading: false,
            userInfo: {password: ''},
            isSet: true,
            isDone: false
        }
    },
    computed: {
        ...mapState({
            // apiToken: state => state.user.apiToken
        })
    },
    methods: {
        send: function () {
            this.loading = true
            axios.post('user/reset_password', {
                api_token: this.$route.params.id,
                password: this.userInfo.password
            }).then((res) => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$message.success(res.data.message)
                    this.isSet = false
                    this.isDone = true
                }
                this.loading = false
            }).catch((err) => {
                console.log(err)
                this.loading = false
            })
        },
        login: function () {
            router.push('/login')
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
        height: 35px;
        color: white;
        background-color: #4CAF50;
        border: none;
        border-radius: 3px;
        font-size: 12pt;
    }
    .goto-login-btn {
        width: 100%;
        height: 35px;
        color: white;
        background-color: #4CAF50;
        border: none;
        border-radius: 3px;
        font-size: 12pt;
    }
</style>
