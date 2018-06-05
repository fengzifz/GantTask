<template>
    <div id="login">
        <el-card class="box-card">
            <h1>登录</h1>
            <el-form :model="userInfo" status-icon ref="userInfo" label-width="100px">
                <el-form-item label="姓名" prop="username">
                    <el-input type="text" v-model="userInfo.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="userInfo.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button align="left" type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import route from '../router'
export default {
    name: 'Login',
    data () {
        return {
            userInfo: {username: '', password: ''}
        }
    },
    methods: {
        login: function () {
            route.push('/')
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
</style>
