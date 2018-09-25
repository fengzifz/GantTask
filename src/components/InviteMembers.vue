<template>
    <el-main class="el-main-fixed-width el-main-no-bg"
             element-loading-spinner="el-icon-loading"
             v-loading="loading">
        <div id="Team-settings">
            <h2 class="title">
                <i class="fa fa-th-large"></i>&nbsp;&nbsp;邮件邀请
            </h2>
        </div>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
            <el-form-item
              v-for="(email, index) in dynamicValidateForm.emails"
              :label="'邮箱'"
              :key="email.key"
              :prop="'emails.' + index + '.value'"
              :rules="[{required: true, message: '请输入邮箱地址', trigger: 'blur'},
              {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}]">
              <el-row>
                <el-col :span="12"><el-input v-model="email.value"></el-input></el-col>
                <el-col :span="1"><p></p></el-col>
                <el-col :span="10"><el-button @click.prevent="removeEmail(email)" type="text">删除</el-button></el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                <el-button @click="addEmail">新增邮箱</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
    name: 'InviteMembers',
    data () {
        return {
            loading: false,
            host: process.env.HOST,
            dynamicValidateForm: {
                emails: [{
                    value: ''
                }]
            }
        }
    },
    computed: {
        ...mapState({
            apiToken: state => state.user.apiToken,
            userInfo: state => state.user.userInfo,
            currentTeamId: state => state.team.currentTeamId
        })
    },
    created: function () {
        this.getUserList()
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = this.dynamicValidateForm.emails
                    let emailArr = []
                    let emailArrStr = ''
                    for (let i = data.length - 1; i >= 0; i--) {
                        emailArr.push(data[i].value)
                    }
                    emailArrStr = emailArr.join(',')
                    this.sendInvite(emailArrStr)
                } else {
                    console.log('error submit')
                    return false
                }
            })
        },
        removeEmail (item) {
            let index = this.dynamicValidateForm.emails.indexOf(item)
            if (index !== -1) {
                this.dynamicValidateForm.emails.splice(index, 1)
            }
        },
        addEmail: function () {
            this.dynamicValidateForm.emails.push({
                value: '',
                key: Date.now()
            })
        },
        sendInvite: function (emailArrStr) {
            this.loading = true
            axios.post('team/send_invite', {
                api_token: this.apiToken,
                email_arr: emailArrStr,
                team_id: this.currentTeamId
            }).then((res) => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$message.success(res.data.message)
                    this.$router.back(-1)
                }
                this.loading = false
                this.dialogVisible = false
            })
        }
    }
}
</script>
<style scoped>
    .grid-text {
       text-align: right;
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
</style>
