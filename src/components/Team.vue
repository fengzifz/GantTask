<template>
    <el-main class="el-main-fixed-width el-main-no-bg"
             element-loading-spinner="el-icon-loading"
             v-loading="loading">
        <div id="team-list">
            <h2 class="title">
                <i class="fa fa-users"></i>&nbsp;&nbsp;团队
                <el-button class="project-new" type="text" @click="dialogVisible = true">新建团队</el-button>
            </h2>
            <el-row :gutter="30">
                <el-col :span="4" v-for="team in teams" :key="team.id">
                    <el-button class="team-btn" type="text" @click="projectList(team.id, team.name)">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="title">{{ team.name }}</div>
                            <!--<div class="members">-->
                                <!--<i class="fa fa-user"></i>-->
                                <!--<span class="num">0</span>-->
                            <!--</div>-->
                        </el-card>
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <!-- New team -->
        <el-dialog
            v-loading="loading"
            title="添加团队"
            :visible.sync="dialogVisible"
            width="30%"
            center>
            <el-form ref="newTeam" :model="newTeam" label-width="80px">
                <el-form-item label="团队名称">
                    <el-input v-model="newTeam.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="create">确 定</el-button>
            </span>
        </el-dialog>
    </el-main>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import router from '../router/index'
export default {
    name: 'Team',
    data () {
        return {
            dialogVisible: false,
            newTeam: {name: ''},
            loading: false
        }
    },
    computed: {
        ...mapState({
            currentTeamId: state => state.team.currentTeamId,
            apiToken: state => state.user.apiToken,
            teams: state => state.team.teams
        })
    },
    created: function () {
        this.getUserTeams()
    },
    methods: {
        projectList: function (teamId, teamName) {
            this.$store.dispatch('team/switchTeam', {id: teamId, name: teamName})
            router.push('/')
        },
        getUserTeams: function () {
            this.loading = true
            axios.get('team/get_user_teams?api_token=' + this.apiToken)
                .then((res) => {
                    if (res.data.error) {
                        this.$message.error(res.data.message)
                    } else {
                        this.$store.dispatch('team/setTeams', res.data.data)
                    }
                    this.loading = false
                })
        },
        create: function () {
            this.loading = true
            axios.post('team/create', {
                name: this.newTeam.name,
                api_token: this.apiToken
            }).then((res) => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$message.success(res.data.message)
                    let team = {id: res.data.data.id, name: res.data.data.name}
                    // Switch current team
                    this.$store.dispatch('team/switchTeam', team)
                    // Add to teams
                    this.$store.dispatch('team/addTeam', team)
                }
                this.loading = false
                this.dialogVisible = false
            }).catch(() => {
                this.loading = false
            })
        }
    }
}
</script>

<style scoped>
    .team-btn {
        width: 100%;
    }
    .el-card {
        height: 88px;
    }
    .el-card .title {
        text-align: center;
        font-size: 18px;
        line-height: 88px;
    }
    .members {
        color: #c8c8c8;
    }
</style>
