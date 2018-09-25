<template>
    <el-main class="el-main-fixed-width el-main-no-bg"
             element-loading-spinner="el-icon-loading"
             v-loading="loading">
        <div id="Team-member">
            <h2 class="title">
                <i class="fa fa-bell"></i>&nbsp;&nbsp;{{ userName }}的设置
            </h2>
            <div class="settings-content">
                <el-row class="user-info">
                    <el-col :span="2" :model="avatarInfo">
                        <div class="avatar">
                            <img class="pic" :src="host + '/storage/' + avatarInfo.image" />
                        </div>
                    </el-col>
                    <el-col :span="20">
                        <div class="user-content">
                            <el-row><label><h3>{{ userName }}</h3></label></el-row>
                            <el-row><label><p>{{ userEmail }}</p></label></el-row>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <div class="member-content">
                        <h2>从团队中移除{{ userName }}</h2>
                        <p>被移除的成员，将不能再访问 GantTask 上的项目信息，但跟他相关的数据不会被删除。</p>
                        <el-button type="text" @click="deletehandle">了解，确定删除{{ userName }}</el-button>
                    </div>
                </el-row>
                <el-row>
                    <div class="member-content">
                        <h2>权限</h2>
                        <p>管理员可以邀请成员</p>
                        <el-form ref="form" :model="form">
                            <el-form-item label="">
                                <el-radio-group v-model="resource" @change="handleChange">
                                    <el-radio label=2 >管理员</el-radio>
                                    <el-radio label=3 >普通用户</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" @click="changeRole">保存设置</el-button>
                    </div>
                </el-row>
            </div>
        </div>
    </el-main>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import router from '../router/index'
export default {
    name: 'memberManage',
    data () {
        return {
            loading: false,
            host: process.env.HOST,
            avatarInfo: {image: ''},
            userName: '',
            userEmail: '',
            isAdmin: false,
            resource: '',
            roleId: 3
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
        this.getUserInfo()
    },
    methods: {
        getUserInfo: function () {
            this.allLoading = true
            axios.get('/team/get_team_user?api_token=' + this.apiToken + '&team_id=' + this.currentTeamId + '&user_id=' + this.$route.query.userid)
                .then((res) => {
                    if (res.data.error) {
                        this.$message.error(res.data.message)
                    } else {
                        this.$store.dispatch('user/setUserInfo', res.data.data[0])
                        this.userName = res.data.data[0].name
                        this.userEmail = res.data.data[0].email
                        this.avatarInfo.image = res.data.data[0].avatar
                        this.isAdmin = res.data.isAdmin
                    }
                    this.allLoading = false
                })
        },
        deletehandle: function () {
            this.loading = true
            axios.post('team/mass_destroy', {
                api_token: this.apiToken,
                email_arr: this.userEmail,
                team_id: this.currentTeamId
            }).then((res) => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$message.success(res.data.message)
                    router.push('/team_settings')
                }
                this.loading = false
            })
        },
        changeRole: function () {
            this.loading = true
            axios.post('team/change_role', {
                api_token: this.apiToken,
                user_email: this.userEmail,
                team_id: this.currentTeamId,
                abilities: this.roleId
            }).then((res) => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$message.success(res.data.message)
                    router.push('/team_settings')
                }
                this.loading = false
            })
        },
        handleChange (val) {
            this.roleId = val
        }
    }
}
</script>
<style scoped>
    .settings-content {
        background-color: #ffffff;
        padding-bottom: 30px;
        padding-left: 30px;
    }
    .member-content {
        margin-left: 30px;
    }
    .user-info {
        margin-left: 15px;
    }
    .form-content {
        width: 50%;
    }
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
    .detail-content {
        margin: 10px 100px;
    }
    .user-content {
        margin: 16px auto 20px;
        margin-left: 25px;
    }
</style>
