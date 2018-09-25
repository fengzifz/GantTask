<template>
    <el-main class="el-main-fixed-width el-main-no-bg"
             element-loading-spinner="el-icon-loading"
             v-loading="loading">
        <div id="Team-settings">
            <h2 class="title">
                <i class="fa fa-th-large"></i>&nbsp;&nbsp;团队管理
                <el-button class="member-new" type="text" @click="invite">邀请新成员</el-button>
            </h2>
        </div>
        <el-table
            :data="tableData"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%">
            <el-table-column
                prop="avatar"
                label="头像"
                width="100">
                <template slot-scope="scope">
                    <div class="avatar">
                        <img class="pic" :src="host + '/storage/' + scope.row.avatar"/>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="role"
                label="角色">
            </el-table-column>
            <el-table-column
                prop="none"
                label="">
                <template slot-scope="scope">
                    <p>-</p>
                </template>
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱">
            </el-table-column>
            <el-table-column
                fixed="right"
                label=""
                width="80">
                <template slot-scope="scope">
                    <p>-</p>
                </template>
            </el-table-column>
        </el-table>
    </el-main>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import router from '../router/index'
export default {
    name: 'TeamSettings',
    data () {
        return {
            loading: false,
            host: process.env.HOST,
            changeRoleVisible: false,
            changeRole: {password: '', email: ''}
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
        getUserList: function () {
            this.loading = true
            axios.get('team/get_team_users?api_token=' + this.apiToken + '&team_id=' + this.currentTeamId)
                .then((res) => {
                    if (res.data.error) {
                        this.$message.error(res.data.message)
                        if (res.data.code === 39) {
                            this.$store.dispatch('team/removeCurrentTeam')
                        }
                    } else {
                        this.tableData = res.data.data
                    }
                    this.loading = false
                })
        },
        invite: function () {
            router.push('/invite_members')
        },
        handleCurrentChange (row) {
            router.push({path: '/member/settings', query: {userid: row.id}})
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
    .member-wrap {
        text-align: center;
    }
    .member-avatar {
        text-align: center;
        overflow: hidden;
        width: 100%;
    }
    .member-avatar img {
        width: 100%;
        height: auto;
        border-radius: 67px;
    }
    .member-role, .member-name, .member-email {
        margin-top: 8px;
    }
</style>
