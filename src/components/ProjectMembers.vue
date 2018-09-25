<template>
    <el-main class="el-main-fixed-width el-main-no-bg"
             element-loading-spinner="el-icon-loading"
             v-loading="loading">
        <div id="project-members">
            <h2 class="title">
                <i class="fa fa-user"></i>&nbsp;&nbsp;项目成员
                <el-button class="project-new" type="text" @click="getTeamMembers">成员管理</el-button>
            </h2>
            <el-row :gutter="20">
                <el-col :span="3" v-for="(item, index) in proMembers" :key="index">
                    <el-card :body-style="{padding: '10px'}" shadow="hover" class="member-wrap">
                        <div class="member-avatar">
                            <img :src="host + '/storage/' + item.avatar " />
                        </div>
                        <div class="member-name">
                            {{ item.name }}
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <el-dialog
            title="添加项目成员"
            :visible.sync="dialogVisible"
            width="30%"
            center>
            <el-row :gutter="20" v-loading="diaLoading">
                <el-col :span="6" v-for="(item, index) in teamMembers" :key="index">
                    <el-checkbox
                        @change="addUserToPro($event, item.id)"
                        v-if="proMembersId.includes(item.id)"
                        checked>
                        {{ item.name }}
                    </el-checkbox>
                    <el-checkbox
                        @change="addUserToPro($event, item.id)"
                        v-else>
                        {{ item.name }}
                    </el-checkbox>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </el-main>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
    name: 'ProjectMembers',
    data () {
        return {
            loading: false,
            diaLoading: false,
            dialogVisible: false,
            host: process.env.HOST,
            proMembers: [],
            teamMembers: [],
            proMembersId: []
        }
    },
    computed: {
        ...mapState({
            apiToken: state => state.user.apiToken,
            teamId: state => state.team.currentTeamId,
            projectId: state => state.project.currentProjectId
        })
    },
    created: function () {
        this.getProMembers()
    },
    methods: {
        addUserToPro: function (checked, userId) {
            // 添加/删除项目成员
            this.diaLoading = true
            let uri = 'project/'
            let suffix = !checked ? 'retract' : 'assign'
            axios.post(uri + suffix, {
                user_id: userId,
                team_id: this.teamId,
                project_id: this.projectId,
                api_token: this.apiToken
            }).then(res => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$message.success(res.data.message)
                    let user = {id: res.data.data.id, name: res.data.data.name}
                    if (checked) {
                        this.proMembers.push(user)
                    } else {
                        this.proMembers = this.proMembers.filter((item, index) => {
                            return item.id !== userId
                        })
                    }
                }
                this.diaLoading = false
            })
        },
        getTeamMembers: function () {
            // 获取团队成员
            this.dialogVisible = true
            this.diaLoading = true
            let token = this.apiToken
            let tid = this.teamId
            axios.get('team/get_team_users?api_token=' + token + '&team_id=' + tid).then(res => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.teamMembers = res.data.data
                }
                this.diaLoading = false
            })
        },
        getProMembers: function () {
            // 获取项目成员
            this.loading = true
            let apiToken = this.apiToken
            let tid = this.teamId
            let pid = this.projectId
            axios.get('project/get_members?api_token=' + apiToken + '&team_id=' + tid + '&project_id=' + pid).then(res => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.proMembers = res.data.data
                    let len = res.data.data.length
                    if (len) {
                        for (let i = 0; i < len; i++) {
                            this.proMembersId.push(res.data.data[i]['id'])
                        }
                    }
                }
                this.loading = false
            })
        }
    }
}
</script>

<style scoped>
    .member-avatar {
        text-align: center;
        overflow: hidden;
        width: 100%;
    }
    .member-avatar img {
        width: 100%;
        height: auto;
        border-radius: 50px;
    }
    .member-name {
        text-align: center;
    }
</style>
