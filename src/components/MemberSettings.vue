<template>
    <el-main class="el-main-fixed-width el-main-no-bg"
             element-loading-spinner="el-icon-loading"
             v-loading="loading">
        <div id="Team-member">
            <h2 class="title">
                <i class="fa fa-bell"></i>&nbsp;&nbsp;我的动态
            </h2>
            <div class="settings-content">
                <el-row>
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
                    <el-col :span="2" v-if="isAdmin">
                        <el-button type="text" @click="memberManage">管理用户</el-button>
                    </el-col>
                </el-row>
                <div class="detail-content">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="任务" name="first">任务</el-tab-pane>
                <el-tab-pane label="关注" name="second">关注</el-tab-pane>
                <el-tab-pane label="日程" name="third">日程</el-tab-pane>
                <el-tab-pane label="汇报" name="fourth">汇报</el-tab-pane>
                <el-tab-pane label="邮件" name="fifth">邮件</el-tab-pane>
                </el-tabs>
                </div>
            </div>
        </div>
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
            loading: false,
            host: process.env.HOST,
            avatarInfo: {image: ''},
            userName: '',
            userEmail: '',
            isAdmin: false,
            userid: 0
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
                        this.userid = res.data.data[0].id
                        this.isAdmin = (this.apiToken === res.data.data[0].api_token) ? false : res.data.isAdmin
                    }
                    this.allLoading = false
                })
        },
        memberManage: function () {
            router.push({path: '/member/manages', query: {userid: this.userid}})
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
