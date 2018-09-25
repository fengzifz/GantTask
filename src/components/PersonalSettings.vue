<template>
    <el-main class="el-main-fixed-width el-main-no-bg"
             element-loading-spinner="el-icon-loading"
             v-loading="loading">
        <div id="Personal-settings">
            <h2 class="title">
                <i class="fa fa-th-large"></i>&nbsp;&nbsp;个人设置
            </h2>
            <div class="settings-content">
                <el-row class="avatar-content">
                    <el-col :span="2" :model="avatarInfo">
                        <div class="avatar">
                            <label for="file">
                                <img class="pic" :src="host + '/storage/' + avatarInfo.image"/>
                            </label>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <el-input @change="fileHandleChange" type="file" ref="updateFile" v-model="updateFile"
                                  auto-complete="off" class="inputfile" id="file"></el-input>
                        <div class="avatarInput">
                            <label for="file">更改头像</label>
                        </div>
                    </el-col>
                </el-row>
                <el-form ref="form" label-width="80px" class="form-content">
                    <el-form-item label="昵称">
                        <el-col :span="23">
                            <el-input v-model="nameInput" placeholder="请输入昵称"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-row>
                            <el-col :span="23">
                                <el-input v-model="emailInput" :disabled="true"></el-input>
                            </el-col>
                            <el-col :span="1">&nbsp;&nbsp;<el-button type="text" @click="changeEmailVisible = true"
                                                                     circle size="small">修改邮箱
                            </el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-row class="grid-text">
                            <el-col :span="9">
                                <el-button type="text" @click="forgotPasswordAction">忘记密码</el-button>
                                <span>/</span>
                                <el-button type="text" @click="changePasswordVisible = true">修改密码</el-button>
                            </el-col>
                        </el-row>
                        <el-row><p></p></el-row>
                        <el-row><p></p></el-row>
                        <el-row>
                            <el-col :span="2">
                                <el-button size="small" type="primary" @click="updateUserInfo">保存</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-dialog
            title="更改邮箱"
            :visible.sync="changeEmailVisible"
            width="30%"
            v-loading="loading"
            center>
            <el-form ref="changeEmail" :model="changeEmail" label-width="80px">
                <el-form-item label="输入密码">
                    <el-input v-model="changeEmail.password" placeholder="请输入你的登录密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新邮箱">
                    <el-input v-model="changeEmail.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="changeEmailVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="changeEmailAction">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改密码"
            :visible.sync="changePasswordVisible"
            width="30%"
            v-loading="loading"
            center>
            <el-form ref="changeEmail" :model="changePassword" label-width="80px">
                <el-form-item label="旧密码">
                    <el-input v-model="changePassword.password" placeholder="请输入你的登录密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="changePassword.newPassword" type="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="changePasswordVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="changePasswordAction">确 定</el-button>
            </span>
        </el-dialog>
    </el-main>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import router from '../router/index'
export default {
    name: 'PersonalSettings',
    data () {
        return {
            changeEmail: {password: '', email: ''},
            changePassword: {password: '', newPassword: ''},
            loading: false,
            changeEmailVisible: false,
            changePasswordVisible: false,
            updateFile: '',
            host: process.env.HOST,
            avatarInfo: {image: ''},
            nameInput: '',
            emailInput: ''
        }
    },
    computed: {
        ...mapState({
            apiToken: state => state.user.apiToken,
            userInfo: state => state.user.userInfo
        })
    },
    created: function () {
        this.getUserInfo()
    },
    methods: {
        changeEmailAction: function () {
            this.loading = true
            axios.post('user/change_email', {
                api_token: this.apiToken,
                password: this.changeEmail.password,
                email: this.changeEmail.email
            }).then((res) => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$message.success(res.data.message)
                    this.$store.dispatch('user/changeEmail', res.data.data)
                    this.changeEmail = {password: '', email: ''}
                    this.emailInput = res.data.data.email
                    this.changeEmailVisible = false
                }
                this.loading = false
            })
        },
        changePasswordAction: function () {
            this.loading = true
            axios.post('user/change_password', {
                api_token: this.apiToken,
                password: this.changePassword.password,
                new_password: this.changePassword.newPassword
            }).then((res) => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$message.success(res.data.message)
                    this.$store.dispatch('user/changePassword', res.data.data)
                    this.changePassword = {password: '', newPassword: ''}
                    this.changePasswordVisible = false
                }
                this.loading = false
            })
        },
        forgotPasswordAction: function () {
            router.push('/users/forgot_password')
        },
        getUserInfo: function () {
            this.loading = true
            axios.get('user/info?api_token=' + this.apiToken)
                .then((res) => {
                    if (res.data.error) {
                        this.$message.error(res.data.message)
                    } else {
                        this.$store.dispatch('user/setUserInfo', res.data.data[0])
                        this.nameInput = res.data.data[0].name
                        this.emailInput = res.data.data[0].email
                        this.avatarInfo.image = res.data.data[0].avatar
                    }
                    this.loading = false
                })
        },
        updateUserInfo: function () {
            this.loading = true
            let config = {}
            let params = new FormData()
            if (this.$refs.updateFile) {
                params.append('image', this.$refs.updateFile.$refs.input.files[0])
                config = {headers: {'Content-Type': 'multipart/form-data'}}
            }
            params.append('api_token', this.apiToken)
            params.append('name', this.nameInput)
            axios.post('user/update_info', params, config).then((res) => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$message.success(res.data.message)
                    this.nameInput = res.data.data.name
                    this.avatarInfo.image = res.data.data.avatar
                    console.log(res.data.data.name)
                    this.$store.dispatch('user/setUsername', res.data.data.name)
                    this.$store.dispatch('user/setUserInfo', res.data.data)
                }
                this.loading = false
            })
        },
        fileHandleChange: function (val) {
            this.updateUserInfo()
        }
    }
}
</script>
<style scoped>
    .settings-content {
        background-color: #ffffff;
    }
    .form-content {
        width: 50%;
        margin-left: 30px;
        padding-bottom: 20px;
    }
    .avatar-content {
        margin-left: 56px;
    }
    .avatar {
        width: 60px;
        height: 60px;
        overflow: hidden;
        border-radius: 40px;
        text-align: center;
        margin: 30px auto 20px;
    }
    .avatar img {
        width: 100%;
        height: auto;
    }
    .inputfile {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }
    .avatarInput {
        margin: 50px auto 20px;
    }
    .avatarInput label {
        cursor: pointer;
    }
</style>
